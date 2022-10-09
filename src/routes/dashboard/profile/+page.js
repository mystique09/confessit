import { redirect } from '@sveltejs/kit';

export async function load({ session, fetch }) {
	if (!session) {
		throw redirect(302, '/login');
	}

	const response = await fetch('/api/profile', {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			authorization: `Bearer ${session}`
		}
	});

	const data = await response.json();

	if (data.status === 'error') {
		throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
		return {
			status: response.status,
			props: { username: '', id: '' }
		};
	}

	return { username: data.data.username, id: data.data.id };
}
