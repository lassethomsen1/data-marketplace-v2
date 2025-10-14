import { writable } from 'svelte/store';
//import { fetchUser } from '@/api/userApi.js';
import { goto } from '$app/navigation';
import { fetchPurchasedDatasets } from '$lib/api/datasetsApi.js';
import { formatDataset } from '$lib/utils/datasetUtil.js';

const savedUser =  null;
const savedToken =  null;

export const user = writable(savedUser || null);
export const token = writable(savedToken || null);
export const purchases = writable([]);

token.subscribe(value => {
	if (value) {
		//localStorage.setItem('token', value);
	} else {
		//localStorage.removeItem('token');
	}
});
user.subscribe(value => {
	if (value) {
		//localStorage.setItem('user', JSON.stringify(value));
	} else {
		//localStorage.removeItem('user');
	}
});

export async function fetchAndSetUser() {
	try {
		//const fetchedUser = await fetchUser();
		const fetchedUser = null; //todo: fix types
		user.set(fetchedUser);
	} catch (error) {
		console.error('Failed to fetch user:', error);
		user.set(null);
	}
}

export async function fetchAndSetPurchases() {
	try {
		const formattedPurchases = []; //todo: fix types
		const fetchedPurchases = await fetchPurchasedDatasets();
		fetchedPurchases.forEach(purchase => {
			formattedPurchases.push(formatDataset(purchase.dataset));
		});
		purchases.set(formattedPurchases);
	} catch (error) {
		console.error('Failed to fetch purchases:', error);
	}
}

export async function logout() {
	user.set(null);
	token.set(null);
	//localStorage.removeItem('user');
	//localStorage.removeItem('token');
	await goto('/');
}
