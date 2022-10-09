import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const { slug } = params;

	const response = await fetch(`/api/me/${slug}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json'
		}
	});

	const data = await response.json();

	if (data.status === 'error') {
		throw error(404);
	}

	return {
		slug
	};
}
