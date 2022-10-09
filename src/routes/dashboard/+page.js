import { redirect } from '@sveltejs/kit';

export async function load({ session, fetch }) {
	if (!session) {
		throw redirect(302, '/login');
	}

	const response = await fetch('/api/dashboard', {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			authorization: `Bearer ${session}`
		}
	});

	const data = await response.json();
	const messages = data.data || [];

	return { messages };
}
