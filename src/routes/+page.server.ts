import { VITE_BACKEND_URL } from "$env/static/private";
import { error, invalid, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
    const { session } = await parent();
    if (!!session.token) {
        throw redirect(307, '/dashboard');
    }
    return {};
}

export const actions: Actions = {
    async signup({ request, fetch }) {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        if (!username || !password) {
            return invalid(400, { credentials: true, message: 'Missing required fields!' });
        }

        if (username.toString().length < 8) {
            return invalid(400, { username: true, message: 'Username must be atleast 8 characters.' });
        }

        if (password.toString().length < 8) {
            return invalid(400, { password: true, message: 'Password must be atleast 8 characters.' });
        }

        try {
            const res = await fetch(`${VITE_BACKEND_URL}/signup`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'access-control-allow-origin': '*'
                },
                body: JSON.stringify({ username: username.toString(), password: password.toString() })
            });
            const data = await res.json();

            if (data.status === "error") {
                return invalid(400, { success: false, message: data.message });
            }

            return { success: true, message: "New user created!" };
        } catch (e: any) {
            console.log(e)
            throw error(e.status, e.message);
        }
    }
}