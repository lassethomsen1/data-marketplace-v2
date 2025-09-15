import { writable } from 'svelte/store';

export const currentTag = writable('');
export const uploadedFiles = writable([]);
export const uploadProgress = writable(0);
export const formData = writable({
  title: '',
  description: '',
  category: '',
  tags: [],
  price: '',
});
export const isUploading = writable(false);
export const showSuccess = writable(false);
export const errors = writable({});
