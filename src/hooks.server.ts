import { interceptRequestEvent, interceptRoute } from "$lib/server/middleware";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	let auth: Auth = {
		session_id: event.cookies.get("session_id") ?? "",
		access_token: event.cookies.get("access_token") ?? "",
		refresh_token: event.cookies.get("refresh_token") ?? "",
		user: JSON.parse(event.cookies.get("user") ?? "{}"),
		user_identity: JSON.parse(event.cookies.get("user_identity") ?? "{}"),
	};

	await interceptRequestEvent(event, auth);
	await interceptRoute(event, auth);

	const response = await resolve(event);
	return response;
};
