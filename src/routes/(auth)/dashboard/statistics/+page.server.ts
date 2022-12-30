import { VITE_BACKEND_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";
import { error } from '@sveltejs/kit';

export const load = (async ({fetch, locals}) => {
	if(locals.serverStatus === "offline") {
		throw error(404, {message: "server is offline."});
	}
	
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
	} catch (err) {
		throw error(500, {message: "something went wrong."});
	}
}) satisfies PageServerLoad;