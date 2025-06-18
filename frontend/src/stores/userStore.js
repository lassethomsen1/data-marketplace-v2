import { writable } from 'svelte/store';
import { fetchUser } from '@/api/userApi.js';
import { navigate } from 'svelte-routing';
import { fetchPurchasedDatasets } from '@/api/datasetsApi.js';
import { formatDataset } from '@/utils/datasetUtil.js';

const savedUser = JSON.parse(localStorage.getItem('user'));
const savedToken = localStorage.getItem('token');

export const user = writable(savedUser || null);
export const token = writable(savedToken || null);
export const purchases = writable([]);

token.subscribe(value => {
  if (value) {
    localStorage.setItem('token', value);
  } else {
    localStorage.removeItem('token');
  }
});
user.subscribe(value => {
  if (value) {
    localStorage.setItem('user', JSON.stringify(value));
  } else {
    localStorage.removeItem('user');
  }
});

export async function fetchAndSetUser() {
  try {
    const fetchedUser = await fetchUser();
    user.set(fetchedUser);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    user.set(null);
  }
}

export async function fetchAndSetPurchases() {
  try {
    const formattedPurchases = [];
    const fetchedPurchases = await fetchPurchasedDatasets();
    fetchedPurchases.forEach(purchase => {
      formattedPurchases.push(formatDataset(purchase.dataset));
    });
    purchases.set(formattedPurchases);
  } catch (error) {
    console.error('Failed to fetch purchases:', error);
  }
}

export function logout() {
  user.set(null);
  token.set(null);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  navigate('/');
}
