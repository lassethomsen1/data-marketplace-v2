import { handleError } from '@/api/helper/error.js';

const testEvents = [
  {
    event: 'transaction:new',
    data: {
      id: 'tx_test_002',
      type: 'purchase',
      buyer: 'ai.researcher@mlhub.org',
      seller: 'Medical Data Corp',
      dataset: 'MRI Brain Scan Dataset',
      amount: 349.5,
      timestamp: '2025-06-16T15:05:00.000Z',
    },
  },
  {
    event: 'transaction:new',
    data: {
      id: 'tx_test_003',
      type: 'purchase',
      buyer: 'jane.doe@fintechlabs.com',
      seller: 'FinanceHub',
      dataset: 'Historical Stock Prices 2000–2024',
      amount: 89.0,
      timestamp: '2025-06-16T15:07:00.000Z',
    },
  },
  {
    event: 'transaction:new',
    data: {
      id: 'tx_test_004',
      type: 'purchase',
      buyer: 'dev@ai-startup.io',
      seller: 'UrbanData.io',
      dataset: 'City Traffic Sensor Logs',
      amount: 129.75,
      timestamp: '2025-06-16T15:10:00.000Z',
    },
  },
  {
    event: 'upload:new',
    data: {
      id: 'up_001',
      seller: 'DataScience Pro',
      fileName: 'customer_segmentation.csv',
      fileSize: '2.4 MB',
      tags: ['marketing', 'analytics', 'customer'],
      status: 'approved',
    },
  },
  {
    event: 'upload:new',
    data: {
      id: 'up_002',
      seller: 'HealthAI Labs',
      fileName: 'heart_disease_patients.json',
      fileSize: '5.1 MB',
      tags: ['healthcare', 'prediction', 'cardiology'],
      status: 'pending',
    },
  },
  {
    event: 'upload:new',
    data: {
      id: 'up_003',
      seller: 'UrbanData.io',
      fileName: 'public_transport_usage.xlsx',
      fileSize: '3.8 MB',
      tags: ['transport', 'city', 'usage'],
      status: 'approved',
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
      console.log('✅ Finished emitting 10 events');
      return;
    }

    emitRandomEvent();
    count++;
  }, 1000);
}
