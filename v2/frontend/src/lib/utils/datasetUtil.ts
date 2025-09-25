import Papa from 'papaparse';
import { goto } from '$app/navigation';
//todo: fix types
export function formatDataset(dataset) {
  dataset.createdAt = new Date(dataset.createdAt).toLocaleDateString();
  dataset.updatedAt = new Date(dataset.updatedAt).toLocaleDateString();

  if (dataset.filesize > 1024 * 1024) {
    dataset.filesize = (dataset.filesize / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    dataset.filesize = (dataset.filesize / 1024).toFixed(2) + ' KB';
  }

  dataset.price = '$' + dataset.price / 100; // price is stored in cents

  dataset.author = dataset.seller.name;
  if (typeof dataset.sampleData === 'string' && dataset.sampleData.trim() !== '') {
    dataset.sampleData = Papa.parse(dataset.sampleData, { header: true }).data;
  } else if (Array.isArray(dataset.sampleData)) {
    // do nothing
  } else {
    dataset.sampleData = [];
  }
  return dataset;
}

export function getStatusColor(status) {
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