import { VITE_BACKEND_URL } from "$env/static/private";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

// check the use in load fuction return 404 if it's not exist
export const load = (async ({params, request, fetch}) => {
	const { username } = params;

	try {
		const req = await fetch(`${VITE_BACKEND_URL}/api/v1/users/one/${username}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		});
		const res = await req.json();
		const {data} = res;

		return {userId: data.id};
	} catch(e) {
		throw error(404, { message: "User not found!" });
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	sendMessage: async ({ request, fetch }) => {
		const data = await request.formData();
		const userId = data.get("userId");
		const message = data.get("message");

		if(!message) {
			return fail(400, { messageFail: true, message: "Message is required!" });
		}

		if(message.toString().length <= 1) {
			return fail(400, { messageFail: true, message: "Message is too short!" });
		}

		try {
			const req = await fetch(`${VITE_BACKEND_URL}/api/v1/messages`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					receiver_id: userId,
					content: message
				})
			});

			const res = await req.json();
			const {data} = res;

			if(req.status !== 200) {
				return fail(req.status, { messageFail: true, message: data.message });
			}

			return {messageSent: true, message: "Message sent!"}
		} catch(e) {
			return fail(500, { messageFail: "Internal server error!" });
		}
	}
};