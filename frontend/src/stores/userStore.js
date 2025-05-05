import { writable } from 'svelte/store';

const savedUser = JSON.parse(localStorage.getItem('user'));
const savedToken = localStorage.getItem('token');

export const user = writable(savedUser || null);
export const token = writable(savedToken || null);

user.subscribe(value => {
  if (value) {
    localStorage.setItem('user', JSON.stringify(value));
  } else {
    localStorage.removeItem('user');
  }
});

token.subscribe(value => {
  if (value) {
    localStorage.setItem('token', value);
  } else {
    localStorage.removeItem('token');
  }
});
