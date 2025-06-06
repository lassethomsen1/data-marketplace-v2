import { navigate } from 'svelte-routing';

export async function handleError(response) {
  //todo lav det her helt om hvorfor er det kun for 403 ; det bliver brugt flere steder for noget andet
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
