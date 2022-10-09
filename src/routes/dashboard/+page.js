import { redirect } from '@sveltejs/kit';

export async function load({ parent, fetch }) {
	const {user} = await parent();
	if (!user) {
		throw redirect(302, '/login');
	}

	const response = await fetch('/api/dashboard', {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			authorization: `Bearer ${user}`
		}
	});

	const data = await response.json();
	const messages = data.data || [];

	return { messages };
}
