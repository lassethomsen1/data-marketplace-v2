import { handleError } from '@/api/helper/error.js';

export async function fetchDataset(datasetID) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/dataset/${datasetID}`, {
    method: 'GET',
  });

  await handleError(response);

  const datasetData = await response.json();
  return datasetData.dataset;
}
