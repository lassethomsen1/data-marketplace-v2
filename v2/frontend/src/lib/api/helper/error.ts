import { goto } from '$app/navigation';

export async function handleError(response: Response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    if (response.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      await goto('/login');
    }
    throw new Error(errorMessage || `Request failed with status ${response.status}`);
  }
}
