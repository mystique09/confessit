import { VITE_BACKEND_URL } from "$env/static/private";
import type { PageServerLoad } from "../$types";

export const load = (async ({fetch, locals}) => {
	try {
		const req = await fetch(`${VITE_BACKEND_URL}/api/v1/users/${locals.user.id}/messages`, {
			method: "GET",
			headers: {
				'content-type': 'application/json',
				'authorization': `Bearer ${locals.access_token}`
			},
		});
		const res = await req.json();
		
		return {
			messages: res.data ?? []
		};
	} catch (error) {
		throw error(error.message);
	}
}) satisfies PageServerLoad;