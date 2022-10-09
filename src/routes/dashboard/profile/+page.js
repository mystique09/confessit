import { redirect, error } from '@sveltejs/kit';

export async function load({ parent, fetch }) {
	const {user} = await parent();
	
	if (!user) {
		throw redirect(302, '/login');
	}

	const response = await fetch('/api/profile', {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			authorization: `Bearer ${user}`
		}
	});

	const data = await response.json();

	if (data.status === 'error') {
		// throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
		throw error(response.status, 'Error getting profile');
	}

	return { username: data.data.username, id: data.data.id };
}
