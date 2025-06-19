import { handleError } from '@/api/helper/error.js';

export async function fetchDataset(datasetID) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/datasets/${datasetID}`, {
    method: 'GET',
  });

  await handleError(response);

  const datasetData = await response.json();
  return datasetData.dataset;
}

export async function fetchDatasets() {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/datasets?limit=6`, {
    method: 'GET',
  });

  await handleError(response);
  return await response.json();
}

export async function searchDatasets({
  search = '',
  limit = 20,
  page = 1,
  category = '',
  minPrice = 0,
  maxPrice = null,
  status = 'AVAILABLE',
}) {
  const params = new URLSearchParams({
    search,
    limit: limit.toString(),
    page: page.toString(),
    category,
    minPrice: minPrice.toString(),
    ...(maxPrice !== null ? { maxPrice: maxPrice.toString() } : {}),
    status,
  });

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/datasets?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  await handleError(response);
  return await response.json();
}

export async function fetchPurchasedDatasets() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/purchases`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  await handleError(response);
  const { purchases } = await response.json();
  return purchases;
}

export async function downloadDataset(datasetID) {
  const token = localStorage.getItem('token');
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/datasets/${datasetID}/download`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  await handleError(response);

  return await response.json();
}

export async function purchaseDataset(datasetID) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/purchases/${datasetID}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  await handleError(response);
  const { checkoutUrl } = await response.json();

  window.location.href = checkoutUrl;
}
