import { VITE_BACKEND_URL } from "$env/static/private";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET = (async({url, locals, fetch}) => {
	const offset = url.searchParams.get("page");

	try {
		const req = await fetch(`${VITE_BACKEND_URL}/api/v1/users/${locals.user.id}/messages`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${locals.access_token}`
			},
		});

		if (req.status !== 200) {
			return json({error: "Unable fetch updated data."}, {
				status: req.status
			});
		}

		const res = await req.json();
		const {data} = res;

		return json(data ?? [], {
			status: 200
		});
	} catch(e) {
		return json({error: "Unable to fetch latest data."}, {
			status: 500
		});
	}
}) satisfies RequestHandler;

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