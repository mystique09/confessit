import { VITE_BACKEND_URL } from "$env/static/private";
import { parseNonPOJO } from "$lib/helpers/parse_pojo";
import type { LayoutServerLoad } from "./$types";

export const load  = (async ({locals, fetch}) => {
	let authenticated = !!locals.session_id && !!locals.access_token && !!locals.refresh_token && !!locals.user && !!locals.user_identity;
	let isServerOffline = false;

	try {
		const req = await fetch(`${VITE_BACKEND_URL}/health`);
		if (req.status !== 200) {
			isServerOffline = true;
		}
	} catch (e) {
		isServerOffline = true;
	}

	return {
		authenticated,
		serverStatus: isServerOffline ? "offline" : "online",
		user: parseNonPOJO(locals.user),
		user_identity: parseNonPOJO(locals.user_identity),
	};
}) satisfies LayoutServerLoad;