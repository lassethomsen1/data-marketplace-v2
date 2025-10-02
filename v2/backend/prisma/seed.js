import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.users.upsert({
    where: { id: '0c0f6996-c665-4716-9710-bf06c2e2b208' },
    update: {
      stripeAccountId: 'acct_1RT3j6PTSm4OXnep',
      stripeOnboardingCompleted: true,
    },
    create: {
      id: '0c0f6996-c665-4716-9710-bf06c2e2b208', // seeded datasets gets assigned to this user
      email: 'user@test.com',
      name: 'User',
      role: 'USER',
      password: await bcrypt.hash('user', 10),
      stripeAccountId: 'acct_1RT3j6PTSm4OXnep',
      stripeOnboardingCompleted: true,
    },
  });
  const admin = await prisma.users.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'Admin',
      role: 'ADMIN',
      password: await bcrypt.hash('admin', 10),
    },
  });
  const userNotOnboarded = await prisma.users.upsert({
    where: { email: 'user-not-onboarded@test.com' },
    update: {
      stripeAccountId: null,
      stripeOnboardingCompleted: false,
    },
    create: {
      id: '9ab00641-55cd-4160-bc71-5dcb838ee8d0',
      email: 'user-not-onboarded@test.com',
      name: 'UserNotOnboarded',
      role: 'USER',
      password: await bcrypt.hash('user', 10),
      stripeAccountId: null,
      stripeOnboardingCompleted: false,
    },
  });
  await prisma.datasets.upsert({
    where: { id: 'fddbd358-7052-479b-9638-fce4791bc220' },
    update: {},
    create: {
      id: 'fddbd358-7052-479b-9638-fce4791bc220',
      title: 'Extrovert vs. Introvert behavior',
      description: `Dive into the Extrovert vs. Introvert Personality Traits Dataset, a rich collection of behavioral and social data designed to explore the spectrum of human personality. This dataset captures key indicators of extroversion and introversion, making it a valuable resource for psychologists, data scientists, and researchers studying social behavior, personality prediction, or data preprocessing techniques.`,
      filekey: 'datasets/0c0f6996-c665-4716-9710-bf06c2e2b208/1749210584337-3cb572e2c48904af',
      filetype: 'application/vnd.ms-excel',
      filesize: 107234,
      tags: ['human'],
      sampleData: `Time_spent_Alone,Stage_fear,Social_event_attendance,Going_outside,Drained_after_socializing,Friends_circle_size,Post_frequency,Personality
4.0,No,4.0,6.0,No,13.0,5.0,Extrovert
9.0,Yes,0.0,0.0,Yes,0.0,3.0,Introvert
9.0,Yes,1.0,2.0,Yes,5.0,2.0,Introvert
0.0,No,6.0,7.0,No,14.0,8.0,Extrovert`,
      price: 99900,
      sellerId: '0c0f6996-c665-4716-9710-bf06c2e2b208',
      status: 'AVAILABLE',
      category: 'research',
    },
  });

  await prisma.datasets.upsert({
    where: { id: 'bde9315a-005c-47bc-bff7-12db5a92205e' },
    update: {},
    create: {
      id: 'bde9315a-005c-47bc-bff7-12db5a92205e',
      title: 'Eurovision',
      description:
        'This dataset combines variables about the songs, countries, artists, results, selection and polls of Eurovision Song Contest entries from 2016-2025. In 2016, a large overhaul in the voting process took effect, essentially doubling the number of points availible by spliting the jury and televote into separate entities.',
      filekey: 'datasets/0c0f6996-c665-4716-9710-bf06c2e2b208/1750346217214-95dd1354bb2f96b9',
      filetype: 'text/csv',
      filesize: 43902,
      tags: ['music', 'pop culture', 'songs'],
      sampleData: `Year,Country ,Song ,Artist ,Final_Place,Final_Points,Top 5,Top 10,Running_Order_Final,Grand_Final_Ind,Big6_Ind,Semi_Final_Num,Semi_Place,Semi_Points,Running_Order_Semi,National_Final,Solo_Artist,Sex,Returning_Artist_Ind,Number of Members,Language1,Language2,Language3,Language4,Multiple_Language,National_Language_Used,EU,NATO,Country_Group,MyESB_Community,MyESB_Personal,OGAE_Points,Qualification_Record
2025,Albania,Zjerm,Shkodra Elektronike,,,,,,,0,1,,,12,1,0,Mixed,0,2,Albanian,,,,0,TRUE,0,1,Southern,4,17,158,0.55
2025,Armenia,Survivor,Parg,,,,,,,0,2,,,5,1,1,M ,0,1,English,,,,0,FALSE,0,0,South-Eastern,30,30,0,0.8125
2025,Australia,Milkshake Man,Go-Jo,,,,,,,0,2,,,1,0,1,M,0,1,English,,,,0,TRUE,0,0,Western,17,21,15,0.777777778
2025,Austria,Wasted Love,JJ,,,,,,,0,2,,,6,0,1,M,0,1,English,,,,0,FALSE,1,0,Central,1,11,382,0.5625`,
      price: 9900,
      sellerId: '0c0f6996-c665-4716-9710-bf06c2e2b208',
      status: 'AVAILABLE',
      category: 'other',
      additionalFiles: null,
      createdAt: new Date('2025-06-19T15:16:57.632Z'),
      updatedAt: new Date('2025-06-19T15:16:57.632Z'),
    },
  });

  await prisma.datasets.upsert({
    where: { id: '59278995-aa42-4d49-b38c-7894ac782bd5' },
    update: {},
    create: {
      id: '59278995-aa42-4d49-b38c-7894ac782bd5',
      title: 'Pet Adoption Records with Animal & Adopter Data',
      description:
        'This Pet Adoption Center dataset is a synthetic collection of 200 records simulating real-world pet adoption scenarios. Each record contains detailed information about the pet, including species, breed, age, color, and gender, as well as arrival and adoption dates.\n\nFor adopted pets, adopter demographics such as name, age, city, and previous pet adoptions are included. For pets not yet adopted, adopter-related fields contain meaningful placeholder values to maintain dataset completeness and avoid missing data.',
      filekey: 'datasets/0c0f6996-c665-4716-9710-bf06c2e2b208/1750346977725-5e926fcef0ab4c96',
      filetype: 'application/vnd.ms-excel',
      filesize: 20478,
      tags: ['pets', 'animals', 'synthetic'],
      sampleData: `pet_id,pet_name,species,breed,age_years,gender,color,arrival_date,adopted,adoption_date,adopter_id,adopter_name,adopter_age,adopter_city,adopter_previous_pets
P0001,Sandra,Dog,Yorkshire Terrier,2,Female,White,2024-10-10,True,2025-03-11,A0001,Megan Rogers,56,Mcgeestad,1
P0002,Brian,Cat,Tonkinese,1,Female,Golden,2023-09-09,True,2024-02-10,A0002,Jonathan Hawkins,18,Geneshire,2
P0003,Timothy,Bird,Amazon Parrot,4,Male,Spotted,2023-10-03,False,2023-10-17,N/A,N/A,-1,N/A,0
P0004,Karl,Dog,German Shepherd,1,Female,White,2024-07-28,True,2024-08-12,A0004,Natalie Rivera,51,North Richard,3`,
      price: 19900,
      sellerId: '0c0f6996-c665-4716-9710-bf06c2e2b208',
      status: 'AVAILABLE',
      category: 'research',
      additionalFiles: null,
      createdAt: new Date('2025-06-19T15:29:38.018Z'),
      updatedAt: new Date('2025-06-19T15:29:38.018Z'),
    },
  });

  await prisma.purchases.upsert({
    where: { id: 'dbe1aa8e-b489-4077-b923-3e370b54760b' },
    update: {},
    create: {
      id: 'dbe1aa8e-b489-4077-b923-3e370b54760b',
      buyerId: '9ab00641-55cd-4160-bc71-5dcb838ee8d0', // user not onboarded
      datasetId: 'fddbd358-7052-479b-9638-fce4791bc220',
      stripeSessionId: 'cs_test_a11NMTAjsJir9Id1YLbhzASKmacgdhR5NkiYIvIQTILSkom8N82oRkvGOG',
      status: 'COMPLETED',
      paidAmount: 99900,
      createdAt: new Date('2025-06-06T12:38:02.413Z'),
      updatedAt: new Date('2025-06-06T12:38:30.162Z'),
    },
  });

  console.log(user ? 'User created' : 'User already exists');
  console.log(admin ? 'admin created' : 'admin already exists');
  console.log(userNotOnboarded ? 'userNotOnboarded created' : 'userNotOnboarded already exists');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
