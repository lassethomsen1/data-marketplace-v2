import { handleError } from '@/api/helper/error.js';
import { testEvents } from '@/api/helper/testEvents.js';

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

export async function fetchSellerStats() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/stats/seller`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  await handleError(response);
  return await response.json();
}
