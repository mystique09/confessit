import { VITE_BACKEND_URL } from "$env/static/private";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


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