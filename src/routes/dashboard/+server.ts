import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.set('session', '', {
        maxAge: 0,
        path: '/',
        httpOnly: true
    });
    return json({ success: true, message: "Logged out!" });
}