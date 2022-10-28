import { VITE_BACKEND_URL } from "$env/static/private";
import type { PageServerLoad } from ".svelte-kit/types/src/routes/dashboard/profile/$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent, fetch }) => {
    const { session } = await parent();
    if (!session.token) {
        throw redirect(307, '/login');
    }

    try {
        const res = await fetch(`${VITE_BACKEND_URL}/users/profile`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                authorization: `Bearer ${session.token}`
            }
        });
        const data = await res.json();
        return { profile: data.data }
    } catch (e: any) {
        throw error(e.status, e.message);
    }
}