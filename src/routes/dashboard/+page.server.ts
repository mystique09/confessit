import { VITE_BACKEND_URL } from "$env/static/private";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, fetch, locals }) => {
    const { authenticated } = await parent();
    if (!authenticated) {
        throw redirect(307, '/login');
    }

    try {
        const res = await fetch(`${VITE_BACKEND_URL}/messages`, {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'authorization': `Bearer ${locals.session.token}`
            },
        })

        const data = await res.json();

        const messages = data.data || [];

        return { messages };
    } catch (e: any) {
        throw error(e.status, e.message);
    }
}