import type { PageServerLoad } from './$types';
import { VITE_BACKEND_URL } from "$env/static/private";
 
export const load = (async ({ parent, fetch, locals }) => {
	const {user, user_identity} = await parent();
	const req = await fetch(`${VITE_BACKEND_URL}/api/v1/users/${user.id}/messages`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${locals.access_token}`
		},
	});
	const res = await req.json();

	return {
		user, user_identity, messages: res.data ?? []
	};
}) satisfies PageServerLoad;