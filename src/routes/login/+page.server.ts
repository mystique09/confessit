import type { PageServerLoad } from "./$types";
import { error, invalid, redirect, type Actions } from "@sveltejs/kit";
import { VITE_BACKEND_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ parent }) => {
    const { session } = await parent();
    if (!!session.token) {
        throw redirect(307, '/dashboard');
    }
    return {};
};

export const actions: Actions = {
    async login({ request, fetch, cookies }) {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        if (!username || !password) {
            return invalid(400, { credentials: true, message: 'Missing required fields!' });
        }

        if (username.toString().length < 8) {
            return invalid(400, { username: true, message: 'Username length must be atleast 8 characters.' });
        }

        if (password.toString().length < 8) {
            return invalid(400, { password: true, message: 'Password length must be atleast 8 characters.' });
        }

        try {
            const res = await fetch(`${VITE_BACKEND_URL}/auth`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (data.status === 'error') {
                return invalid(400, { success: false, message: data.message });
            }

            cookies.set('session', JSON.stringify({ token: data.data, name: username }), {
                path: '/',
                maxAge: 60 * 60 * 7,
                secure: import.meta.env.MODE === "production",
                httpOnly: true
            });

            return { success: true, message: 'Signed in!' };
        } catch (e: any) {
            throw error(e.status, e.message);
        }
    }
}