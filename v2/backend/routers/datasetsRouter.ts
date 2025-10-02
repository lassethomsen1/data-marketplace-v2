import { Router, Response, Request } from 'express';
import * as multer from 'multer';
import * as crypto from 'crypto';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { authenticateToken } from '../middleware/auth';
import { DatasetStatus, Prisma, prisma } from "@data/prisma";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
//import emitStat from './socket/socketEmits.js';
import { extractSampleData, verifySellerStatus } from './helper/datasetsHelper.js';
import { authReqDTO } from "../types/ReqDTO";

const router = Router();

const endpoint = process.env.R2_ENDPOINT;
const accessKeyId = process.env.R2_ACCESS_KEY;
const secretAccessKey = process.env.R2_SECRET_KEY;

if (!endpoint || !accessKeyId || !secretAccessKey) {
  throw new Error('Missing R2 environment variables');
}

const s3 = new S3Client({
  region: 'auto',
  endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});


const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});
interface DatasetsQuery {
  search?: string;
  limit?: string;      // query params come in as strings
  page?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string | null;
  status?: string;
}

router.get('/datasets', async (req: Request<{}, {}, {}, DatasetsQuery>, res: Response) => {
  try {
    const { //todo lav type
      search = '',
      limit = '20',
      page = '1',
      category = '',
      minPrice = '0',
      maxPrice = null,
      status = 'AVAILABLE',
    } = req.query;

    const limitNum = Math.min(Math.max(parseInt(limit) || 20, 1), 100); // Max 100 datasets per request
    const pageNum = Math.max(parseInt(page) || 1, 1);
    const skip = (pageNum - 1) * limitNum;
    const minPriceNum = Math.max(parseInt(minPrice) || 0, 0);
    const maxPriceNum = maxPrice ? Math.max(parseInt(maxPrice), minPriceNum) : null;

    const whereClause: Prisma.DatasetsWhereInput = {
      status: (status as DatasetStatus) || 'AVAILABLE',
      ...(search
        ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } } as Prisma.DatasetsWhereInput,
            { description: { contains: search, mode: 'insensitive' } } as Prisma.DatasetsWhereInput,
            { tags: { hasSome: [search] } } as Prisma.DatasetsWhereInput,
            { seller: { name: { contains: search, mode: 'insensitive' } } } as Prisma.DatasetsWhereInput,
          ],
        }
        : {}),
      ...(category ? { category: { contains: category, mode: 'insensitive' } } : {}),
      price: {
        gte: minPriceNum,
        ...(maxPriceNum !== null ? { lte: maxPriceNum } : {}),
      },
    };

    const datasets = await prisma.datasets.findMany({
      where: whereClause,
      omit: {
        filekey: true,
      },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limitNum,
    });

    const totalCount = await prisma.datasets.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalCount / limitNum);

    return res.send({
      datasets,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        hasNextPage: pageNum < totalPages,
        hasPreviousPage: pageNum > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching datasets:', error);
    return res.status(500).send({ error: 'Failed to fetch datasets' });
  }
});

router.get('/datasets/performance', authenticateToken, async (req: authReqDTO, res: Response) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const datasets = await prisma.datasets.findMany({
      where: {
        sellerId: userId,
      },
      include: {
        purchases: {
          where: {
            status: 'COMPLETED',
          },
        },
      },
    });

    const performanceData = datasets.map(dataset => {
      const completedPurchases = dataset.purchases;
      const sales = completedPurchases.length;
      const revenue = completedPurchases.reduce((total, purchase) => {
        return total + (purchase.paidAmount || 0);
      }, 0);

      return {
        id: dataset.id,
        name: dataset.title,
        price: (dataset.price / 100).toFixed(2),
        sales: sales,
        revenue: (revenue / 100).toFixed(2),
        status: dataset.status,
        createdAt: dataset.createdAt,
      };
    });

    res.send(performanceData);
  } catch (error) {
    console.error('Error fetching dataset performance:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

router.get('/datasets/:datasetId', async (req: Request, res: Response) => {
  try {
    const { datasetId } = req.params;

    const dataset = await prisma.datasets.findUnique({
      omit: {
        filekey: true,
      },
      where: { id: datasetId },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!dataset) {
      return res.status(404).send({ error: 'Dataset not found' });
    }

    return res.send({
      dataset,
    });
  } catch (error) {
    console.error('Error fetching dataset:', error);
    return res.status(500).send({ error: 'Failed to fetch dataset' });
  }
});

router.get('/datasets/:datasetId/download', authenticateToken, async (req: authReqDTO, res:Response) => {
  try {
    const { datasetId } = req.params;
    const userId = req.user.id;

    const dataset = await prisma.datasets.findUnique({
      where: { id: datasetId },
      include: {
        purchases: {
          where: { buyerId: userId },
        },
      },
    });

    if (!dataset) {
      return res.status(404).send({ error: 'Dataset not found' });
    }

    const isSeller = dataset.sellerId === userId;
    const hasPurchased = dataset.purchases.length > 0;

    if (!isSeller && !hasPurchased) {
      return res.status(403).send({
        error: 'Access denied. You must purchase this dataset to download it.',
      });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: dataset.filekey,
    });

    const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour

    return res.send({
      downloadUrl,
      filename: `${dataset.title}.${dataset.filetype.split('/')[1]}`,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).send({
      error: 'Failed to generate download link',
      message: error.message,
    });
  }
});

router.post('/datasets/upload', authenticateToken, upload.single('file'), async (req: authReqDTO, res: Response) => {
  try {
    const userId = req.user.id;

    await verifySellerStatus(userId);

    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' });
    }

    const { title, description, price, tags, category } = req.body;

    if (!title || !description || !price) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (e) {
        return res.status(400).send({ error: 'Invalid tags format' });
      }
    }

    const fileBuffer = req.file.buffer;
    const filesize = req.file.size;
    const filetype = req.file.mimetype;

    const filekey = `datasets/${userId}/${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;

    const sampleData = await extractSampleData(fileBuffer, filetype);

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: filekey,
        Body: fileBuffer,
        ContentType: filetype,
      })
    );
    const dataset = await prisma.datasets.create({
      data: {
        title,
        description,
        filekey,
        filetype,
        filesize,
        tags: parsedTags,
        status: 'AVAILABLE', // need to be here until implemention of R2 webhook
        category,
        sampleData,
        price: Math.round(parseFloat(price) * 100), // store in cents
        sellerId: userId,
      },
    });
    /*await emitStat('upload:new', {
      title,
      filetype,
      filesize,
      tags: parsedTags,
      sellerId: userId,
      status: 'AVAILABLE',
      category,
      createdAt: new Date(),
      seller: {
        email: req.user.email,
      },
      price: Math.round(parseFloat(price) * 100),
      sampleData,
    });
    */
    return res.status(201).send({
      message: 'Dataset uploaded successfully',
      dataset: {
        id: dataset.id,
        title: dataset.title,
        description: dataset.description,
        tags: dataset.tags,
        price: dataset.price,
        createdAt: dataset.createdAt,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).send({
      error: 'Failed to upload dataset',
      message: error.message,
    });
  }
});
export default router;
