import { writable } from 'svelte/store';

export const searchResults = writable({
  datasets: [
    {
      id: '',
      title: '',
      description: '',
      filetype: '',
      filesize: 0,
      tags: [''],
      sampleData: '',
      price: 0,
      sellerId: '',
      status: 'AVAILABLE',
      category: '',
      additionalFiles: null,
      createdAt: '',
      updatedAt: '',
      seller: {
        id: '',
        name: '',
      },
    },
  ],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalCount: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
});
