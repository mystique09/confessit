import { VITE_BACKEND_URL } from "$env/static/private";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async ({ cookies, fetch, locals }) => {
	const sessionId = locals.session_id;

    try {
        const req = await fetch(`${VITE_BACKEND_URL}/api/v1/auth/clear`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ session_id: sessionId })
        });

        cookies.delete("session_id", {
            path: '/',
            maxAge: -1
        });
        cookies.delete("access_token", {
            path: '/',
            maxAge: -1,
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

        return json({ message: "cookies deleted" });
    } catch (e) {
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

        return json({ message: e.message }, {
            status: e.status
        });
    }
}) satisfies RequestHandler;