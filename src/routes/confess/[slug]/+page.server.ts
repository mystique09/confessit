import { VITE_BACKEND_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";
import { error, invalid, type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, fetch }) => {
    const { slug } = params;
    const res = await fetch(`${VITE_BACKEND_URL}/public/users/${slug}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    });
    const data = await res.json();

    if (data.status === 'error') {
        throw error(404, data.message);
    }

    return { slug }
}

export const actions: Actions = {
    async send({ fetch, request, params }) {
        const { slug } = params;
        const data = await request.formData();
        const message = data.get('message');

        if (!message) {
            return invalid(400, { confess: true, message: "Missing required fields!" });
        }

        if (message.toString().length < 8) {
            return invalid(400, { confess: true, message: "That's too short(hint: must be atleast 8 characters.)! I know you can do better than that." });
        }

        try {
            const res = await fetch(`${VITE_BACKEND_URL}/confess`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ message, to: slug }),
            });
            const json = await res.json();
            console.log(json);

            return { success: true, message: "Message has been sent to receiver! Now, goodluck <3." };
        } catch (e: any) {
            throw error(e.status, e.message);
        }
    }
}