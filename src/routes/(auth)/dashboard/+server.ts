import { VITE_BACKEND_URL } from "$env/static/private";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const PUT = (async ({request, locals, fetch}) => {
	const body = await request.json();
	const {access_token} = locals;
	const messageId = body.message_id;

	try {
		const req = await fetch(`${VITE_BACKEND_URL}/api/v1/messages/${messageId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${access_token}`
			},
		});
		const res = await req.json();

		if (req.status !== 200) {
			return json(res, {
				status: req.status
			});
		}

		return json(res, {
			status: 200
		});
	} catch(e) {
		return json({error: e.message}, {
			status: 500
		})
	}
}) satisfies RequestHandler;

export const DELETE = (async ({request, locals, fetch}) => {
	const body = await request.json();
	const {access_token} = locals;
	const messageId = body.message_id;

	try {
		const req = await fetch(`${VITE_BACKEND_URL}/api/v1/messages/${messageId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${access_token}`
			},
		});
		const res = await req.json();

		if (req.status !== 200) {
			return json(res, {
				status: req.status
			});
		}

		return json(res, {
			status: 200
		});

	} catch(e) {
		return json({error: e.message}, {
			status: 500
		})
	}
}) satisfies RequestHandler;