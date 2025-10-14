import Papa from 'papaparse';
import { goto } from '$app/navigation';
import type { Datasets } from '@data/prisma';

export function formatDataset(dataset: Datasets) {
	const formattedDataset = {
		createdAt: '',
		updatedAt: '',
		filesize: '',
		price: '',
		author: '',
		sampleData: [''],
	}
  formattedDataset.createdAt = new Date(dataset.createdAt).toLocaleDateString();
  formattedDataset.updatedAt = new Date(dataset.updatedAt).toLocaleDateString();

  if (dataset.filesize > 1024 * 1024) {
    formattedDataset.filesize = (dataset.filesize / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    formattedDataset.filesize = (dataset.filesize / 1024).toFixed(2) + ' KB';
  }

  formattedDataset.price = '$' + dataset.price / 100; // price is stored in cents

  formattedDataset.author = dataset.seller.name; //todo fix types
  if (dataset.sampleData.trim() !== '') {
    // @ts-ignore
		formattedDataset.sampleData = Papa.parse(dataset.sampleData, { header: true }).data; //todo: fix det her
  } else if (Array.isArray(dataset.sampleData)) {
    // do nothing
  } else {
    formattedDataset.sampleData = [];
  }
  return dataset;
}

export function getStatusColor(status: Datasets["status"]) {
  switch (status.toUpperCase()) {
    case 'PENDING':
      return 'text-blue-600 bg-blue-100';
    case 'COMPLETED':
      return 'text-green-600 bg-green-100';
    case 'AVAILABLE':
      return 'text-green-600 bg-green-100';
    case 'ACTIVE':
      return 'text-green-600 bg-green-100';
    case 'REJECTED':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
}

export async function handleSearch(event, searchQuery: string) {
	event.preventDefault();

	if (searchQuery.trim()) {
		await goto(`/search/${encodeURIComponent(searchQuery.trim())}`);
	} else {
		await goto('/');
	}
}