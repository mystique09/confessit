import { VITE_BACKEND_URL } from "$env/static/private";
import { error } from "@sveltejs/kit";
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