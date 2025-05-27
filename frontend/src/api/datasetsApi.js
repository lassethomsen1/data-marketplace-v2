import { handleError } from '@/api/helper/error.js';

export async function fetchDataset(datasetID) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dataset/${datasetID}`, {
    method: 'GET',
  });

  await handleError(response);

  const datasetData = await response.json();
  return datasetData.dataset;
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
