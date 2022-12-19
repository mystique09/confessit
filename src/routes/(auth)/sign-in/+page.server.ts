import { NODE_ENV, VITE_BACKEND_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from './$types';
 
export const load = (async ({ parent }) => {
	const {authenticated} = await parent();

	if(authenticated) {
		throw redirect(301, "/dashboard");
	}

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	signIn: async function({request, fetch, cookies}) {
		const data = await request.formData();
		const username = data.get("username");
		const password = data.get("password");

		if(!(password && username)) {
			return fail(400, {missingCredentials: true, message: "Missing username or password"});
		}

		if(username.length < 8) {
			return fail(400, {invalidUsernameLength: true, message: "Username must be at least 8 characters long"});
		}

		if(password.length < 8) {
			return fail(400, {invalidPasswordLength: true, message: "Password must be at least 8 characters long"});
		}

		try {
			const req = await fetch(`${VITE_BACKEND_URL}/api/v1/auth`, {
				method: "POST",
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({username, password})
			});

			const {data} = await req.json();
			cookies.set("session_id", data.session_id, {
				path: "/",
				httpOnly: true,
				maxAge: new Date(data.refresh_token_expiry).getTime(),
				secure: NODE_ENV === "production"
			});
			cookies.set("access_token", data.access_token, {
				path: "/",
				httpOnly: true,
				maxAge: new Date(data.access_token_expiry).getTime(),
				secure: NODE_ENV === "production"
			});
			cookies.set("refresh_token", data.refresh_token, {
				path: "/",
				httpOnly: true,
				maxAge: new Date(data.refresh_token_expiry).getTime(),
				secure: NODE_ENV === "production"
			});
			cookies.set("user", JSON.stringify(data.user), {
				path: "/",
				httpOnly: true,
				maxAge: new Date(data.refresh_token_expiry).getTime(),
				secure: NODE_ENV === "production"
			});
			cookies.set("user_identity", JSON.stringify(data.user_identity), {
				path: "/",
				httpOnly: true,
				maxAge: new Date(data.refresh_token_expiry).getTime(),
				secure: NODE_ENV === "production"
			});

			return {success: true, message: "Successfully signed in"};
		} catch(e) {
			return fail(400, {loginFailed: true, message: e.message});
		}
	}
};