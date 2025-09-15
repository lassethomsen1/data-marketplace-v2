import { navigate } from 'svelte-routing';

export async function handleError(response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    if (response.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
    throw new Error(errorMessage || `Request failed with status ${response.status}`);
  }
}
