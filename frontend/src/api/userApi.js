//todo skal være i userStore
import { handleError } from './helper/error.js';
import { navigate } from 'svelte-routing';

export async function getUser() {
  const token = localStorage.getItem('token');
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/auth/user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  await handleError(response);
  const userData = await response.json();
  return userData.user;
}
export async function onboardUser() {
  const token = localStorage.getItem('token');
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/stripe/onboard-seller', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  await handleError(response);
  const { url } = await response.json();

  navigate(url);
}
