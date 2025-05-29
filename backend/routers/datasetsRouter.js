import { Router } from 'express';
import multer from 'multer';
import crypto from 'crypto';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { authenticateToken } from '../middleware/auth.js';
import { PrismaClient } from '../generated/prisma/index.js';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const router = new Router();
const prisma = new PrismaClient();

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
});

async function verifySellerStatus(userId) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }
  if (!user.stripeAccountId || !user.stripeOnboardingCompleted) {
    throw new Error('You must complete Stripe onboarding before selling datasets');
  }

  return user;
}

// Helper function to parse sample data from file todo: make this more robust
// should take 10 first units
async function extractSampleData(buffer, filetype) {
  if (filetype.includes('json')) {
    try {
      const sampleBuffer = buffer.slice(0, Math.min(1000, buffer.length));
      const dataStr = sampleBuffer.toString();
      return dataStr.slice(0, 500);
    } catch (err) {
      return 'Sample data extraction failed';
    }
  } else if (filetype.includes('csv') || filetype.includes('vnd.ms-excel')) {
    try {
      const sampleBuffer = buffer.slice(0, Math.min(1000, buffer.length));
      const dataStr = sampleBuffer.toString();
      const rows = dataStr.split('\n').slice(0, 5);
      return rows.join('\n');
    } catch (err) {
      return 'Sample data extraction failed';
    }
  }

  return 'Sample preview not available for this file type';
}

router.post('/upload', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const userId = req.user.id;

    await verifySellerStatus(userId);

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, description, price, tags, category } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (e) {
        return res.status(400).json({ error: 'Invalid tags format' });
      }
    }

    const fileBuffer = req.file.buffer;
    const fileSize = req.file.size;
    const fileType = req.file.mimetype;

    const fileKey = `datasets/${userId}/${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;

    const sampleData = await extractSampleData(fileBuffer, fileType);

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileKey,
        Body: fileBuffer,
        ContentType: fileType,
      })
    );
    // todo grim kode: fix filekey osv...
    const dataset = await prisma.datasets.create({
      data: {
        title,
        description,
        filekey: fileKey,
        filetype: fileType,
        filesize: fileSize,
        tags: parsedTags,
        category,
        sampleData,
        price: Math.round(parseFloat(price) * 100), // store in cents
        sellerId: userId,
      },
    });

    return res.status(201).json({
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
    return res.status(500).json({
      error: 'Failed to upload dataset',
      message: error.message,
    });
  }
});

router.get('/download/:datasetId', authenticateToken, async (req, res) => {
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
      return res.status(404).json({ error: 'Dataset not found' });
    }

    const isSeller = dataset.sellerId === userId;
    const hasPurchased = dataset.purchases.length > 0;

    if (!isSeller && !hasPurchased) {
      return res.status(403).json({
        error: 'Access denied. You must purchase this dataset to download it.',
      });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: dataset.filekey,
    });

    const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour

    return res.json({
      downloadUrl,
      filename: `${dataset.title}.${dataset.filetype.split('/')[1]}`,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error('Download error:', error);
    return res.status(500).json({
      error: 'Failed to generate download link',
      message: error.message,
    });
  }
});
router.get('/datasets', async (req, res) => {
  try {
    //todo make this take a optional search query and amount of datasets to return
    const datasets = await prisma.datasets.findMany({
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
    });

    return res.send(datasets);
  } catch (error) {
    console.error('Error fetching datasets:', error);
    return res.status(500).send({ error: 'Failed to fetch datasets' });
  }
});

router.get('/datasets/:datasetId', async (req, res) => {
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
export default router;
