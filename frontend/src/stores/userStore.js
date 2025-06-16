import { writable } from 'svelte/store';
import { getUser } from '@/api/userApi.js';
import { navigate } from 'svelte-routing';

const savedUser = JSON.parse(localStorage.getItem('user'));
const savedToken = localStorage.getItem('token');

export const user = writable(savedUser || null);
export const token = writable(savedToken || null);

token.subscribe(value => {
  if (value) {
    localStorage.setItem('token', value);
  } else {
    localStorage.removeItem('token');
  }
});
export async function fetchUser() {
  try {
    const fetchedUser = await getUser();
    console.log(fetchedUser);
    user.set(fetchedUser);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    user.set(null);
  }
}

export function logout() {
  user.set(null);
  token.set(null);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  navigate('/');
}
