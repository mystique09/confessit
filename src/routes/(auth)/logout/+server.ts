import { json, type RequestHandler } from "@sveltejs/kit";

export const POST = (async ({cookies}) => {
	cookies.delete("session_id", {
		path: '/',
		maxAge: -1
	});
	cookies.delete("access_token", {
		path: '/',
		maxAge: -1
	});
	cookies.delete("refresh_token", {
		path: '/',
		maxAge: -1
	});
	cookies.delete("user", {
		path: '/',
		maxAge: -1
	});
	cookies.delete("user_identity", {
		path: '/',
		maxAge: -1
	});

	return json({mesasge: "cookies deleted"});
}) satisfies RequestHandler;