import { handleError } from '@/api/helper/error.js';

const testEvents = [
  {
    event: 'transaction:new',
    data: {
      id: 'tx_test_101',
      status: 'COMPLETED',
      buyer: {
        email: 'alice.wonderland@datascience.com',
      },
      dataset: {
        title: 'Healthcare Analytics Dataset',
        seller: {
          email: 'bob@healthdata.io',
        },
        price: 12500.0,
      },
      timestamp: '2025-06-16T10:15:00.000Z',
    },
  },
  {
    event: 'transaction:new',
    data: {
      id: 'tx_test_102',
      status: 'PENDING',
      buyer: {
        email: 'charlie.brown@fintechlabs.com',
      },
      dataset: {
        title: 'Market Research Insights',
        seller: {
          email: 'diane@marketresearch.ai',
        },
        price: 4999.0,
      },
      timestamp: '2025-06-16T12:45:00.000Z',
    },
  },
  {
    event: 'transaction:new',
    data: {
      id: 'tx_test_103',
      status: 'COMPLETED',
      buyer: {
        email: 'eve.adams@mlhub.org',
      },
      dataset: {
        title: 'Urban Mobility Patterns',
        seller: {
          email: 'frank@urban-data.com',
        },
        price: 7999.0,
      },
      timestamp: '2025-06-16T14:30:00.000Z',
    },
  },
  {
    event: 'upload:new',
    data: {
      id: 'fddbd358-7052-479b-9638-fce4791bc220',
      title: 'Extrovert vs. Introvert behavior',
      filetype: 'application/vnd.ms-excel',
      filesize: '104333',
      tags: ['human'],
      sellerId: '0c0f6996-c665-4716-9710-bf06c2e2b208',
      status: 'AVAILABLE',
      category: 'research',
      additionalFiles: null,
      createdAt: '2025-06-06T00:00:00.000Z',
      updatedAt: '2025-06-06T00:00:00.000Z',
      seller: {
        email: 'user@test.com',
      },
    },
  },
  {
    event: 'upload:new',
    data: {
      id: 'a1e2d563-4bcf-47f4-8ccf-badbe19a67fd',
      title: 'Heart Disease Prediction Dataset',
      filetype: 'application/json',
      filesize: '123213',
      tags: ['health', 'cardiology'],
      sellerId: '1e3f99c0-ffe2-4e87-bb1a-8df3ac86f622',
      status: 'AVAILABLE',
      category: 'healthcare',
      additionalFiles: null,
      createdAt: '2025-06-10T00:00:00.000Z',
      updatedAt: '2025-06-10T00:00:00.000Z',
      seller: {
        email: 'health@datasets.io',
      },
    },
  },
  {
    event: 'upload:new',
    data: {
      id: '9e3b4ef1-d2d9-4f6c-bb58-dcf83d7b6bfa',
      title: 'Public Transport Usage Logs',
      filetype: 'application/json',
      filesize: '23123',
      tags: ['transport', 'urban'],
      sellerId: 'ecad9cf0-d9ff-4ebc-bd11-21a1f7fc2050',
      status: 'AVAILABLE',
      category: 'mobility',
      additionalFiles: null,
      createdAt: '2025-06-12T00:00:00.000Z',
      updatedAt: '2025-06-12T00:00:00.000Z',
      seller: {
        email: 'urban@data.io',
      },
    },
  },
  {
    event: 'upload:new',
    data: {
      id: '35d6f1e4-81b9-4e9e-ae55-c582b8f3b6b1',
      title: 'Customer Segmentation CSV',
      filetype: 'text/csv',
      filesize: '222222',
      tags: ['marketing', 'customers'],
      sellerId: '45dbb076-d3c6-43f6-aab9-22eb70987899',
      status: 'AVAILABLE',
      category: 'business',
      additionalFiles: null,
      createdAt: '2025-06-14T00:00:00.000Z',
      updatedAt: '2025-06-14T00:00:00.000Z',
      seller: {
        email: 'vendor@analytics.com',
      },
    },
  },
];

export async function fetchStats() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stats`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  await handleError(response);
  return await response.json();
}

export async function fetchTransactions() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stats/transactions`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  await handleError(response);
  return await response.json();
}

export async function fetchUploads() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stats/uploads`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  await handleError(response);
  return await response.json();
}

async function emitRandomEvent() {
  const event = testEvents[Math.floor(Math.random() * testEvents.length)];
  const token = localStorage.getItem('token');

  await fetch(`${import.meta.env.VITE_BACKEND_URL}/dev/emit-test`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
}

export async function simulateEvents() {
  let count = 0;
  const interval = setInterval(() => {
    if (count >= 10) {
      clearInterval(interval);
      return;
    }

    emitRandomEvent();
    count++;
  }, 1000);
}
