import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get("session_id") ?? "";
	const accessToken = event.cookies.get("access_token") ?? "";
	const refreshToken = event.cookies.get("refresh_token") ?? "";
	const user = JSON.parse(event.cookies.get("user") ?? "{}");
	const userIdentity = JSON.parse(event.cookies.get("user_identity") ?? "{}");

	event.locals.session_id = sessionId;
	event.locals.access_token = accessToken;
	event.locals.refresh_token = refreshToken;
	event.locals.user = user;
	event.locals.user_identity = userIdentity;

    const response = await resolve(event);
    return response;
}