import { VITE_BACKEND_URL } from "$env/static/private";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST = (async ({ cookies, fetch }) => {
    try {
        const sessionId = cookies.get("session_id");
        const req = await fetch(`${VITE_BACKEND_URL}/api/v1/auth/clear`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ session_id: sessionId })
        });

        if (req.status !== 200) {
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
            return json({ mesasge: "cookies deleted" });
        }

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

        return json({ mesasge: "cookies deleted" });
    } catch (e) {
        return json({ message: e.message }, {
            status: e.status
        });
    }
}) satisfies RequestHandler;