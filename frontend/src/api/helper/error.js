export async function handleError(response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    if (response.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    throw new Error(errorMessage || `Request failed with status ${response.status}`);
  }
}
