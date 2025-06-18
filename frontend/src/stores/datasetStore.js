import { writable } from 'svelte/store';
import { formatDataset } from '@/utils/datasetUtil.js';
import { fetchDataset } from '@/api/datasetsApi.js';

export const dataset = writable({
  id: undefined,
  title: undefined,
  description: undefined,
  sampleData: undefined,
  filetype: undefined,
  filesize: undefined,
  price: undefined,
  category: undefined,
  updatedAt: undefined,
  dataPoints: undefined, // skal det muligvis være der ?
  author: undefined,
});

export async function fetchAndSetFormattedDataset(datasetId) {
  dataset.set(formatDataset(await fetchDataset(datasetId)));
}
