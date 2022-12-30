import { VITE_BACKEND_URL } from "$env/static/private";
import { error, fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";


export const load = (async ({params, fetch, locals}) => {
	const {cid} = params;

	try {
		const req = await fetch(`${VITE_BACKEND_URL}/api/v1/posts/${cid}`);
		const commentsReq = await fetch(`${VITE_BACKEND_URL}/api/v1/posts/${cid}/comments`);

		if(req.status !== 200) {
			throw error(req.status, {message: "not found"})
		}

		const post = await req.json();
		const comments = await commentsReq.json();

		return {
			post: post.data ?? {},
			comments: comments.data ?? []
		};
	} catch (err) {
		throw error(404, {message: "not found"})
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	newComment: async ({params, request, fetch, locals}) => {
		const {cid} = params;
		const data = await request.formData();
		const comment = data.get("comment").toString();

		if(!comment) {
			return fail(400, {commentFailed: true, message: "comment is required"});
		}

		try {
			const req = await fetch(`${VITE_BACKEND_URL}/api/v1/comments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${locals.access_token}`,
				},
				body: JSON.stringify({
					content: comment,
					parent_id: "00000000-0000-0000-0000-000000000000",
					post_id: cid,
					user_identity_id: locals.user_identity.id,
				})
			});

			if(req.status !== 200) {
				return fail(req.status, {commentFailed: true, message: "comment failed"});
			}

			const res = await req.json();

			return {commentSuccess: true, message: "comment success"};
		} catch(err) {
			return fail(400, {commentFailed: true, message: "comment failed"})
		}
	}
};