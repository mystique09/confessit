import { redirect } from '@sveltejs/kit';

export async function load({ session }) {
	if (session) {
		throw redirect(302, '/dashboard');
	}
	return {};
}
