import { VITE_BACKEND_URL } from "$env/static/private";
import { error, fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";


export const load = (async function({fetch, locals, url}) {
	const page = Number(url.searchParams.get("page")) || 0;
	console.log(page);

	try {
		const req = await fetch(`${VITE_BACKEND_URL}/api/v1/posts?page=${page}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			}
		});

		if(req.status !== 200) {
			console.log(req.status)
		}

		const posts = await req.json();

		return {
			posts: posts ?? [],
		};
	} catch(err) {
		throw error(500, "Internal Server Error")
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	createNewPost: async ({request, fetch, locals}) => {
		const data = await request.formData();
		const content = data.get("content").toString();

		try {
			if(!content) {
				return fail(400, {postFailed: true, message: "Post content is required."});
			}

			const req = await fetch(`${VITE_BACKEND_URL}/api/v1/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${locals.access_token}`
				},
				body: JSON.stringify({
					content: content,
					user_identity_id: locals.user_identity.id
				})
			});


			if(req.status !== 200) {
				return fail(400, {postFailed: true, message: "Unable to create post"});
			}

			const res = await req.json();

			if(req.status !== 200) {
				return fail(400, {postFailed: true, message: res.message});
			}

			return { newPostSuccess: true, message: "Post created successfully." };
		} catch(err) {
			return fail(400, {message: "Something went wrong."});
		}
	}
};