import { VITE_BACKEND_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ parent }) => {
	const {authenticated} = await parent();

	if(authenticated) {
		throw redirect(301, "/dashboard");
	}

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	signUp: async function({request, fetch}) {
		const data = await request.formData();
		const username  = data.get("username");
		const password  = data.get("password");
		const confirmPassword = data.get("confirm-password");

		if (username.length < 8) {
			return fail(400, {invalidUsernameLength: true, message: "Username must be at least 8 characters long."})
		}

		if (password.length < 8) {
			return fail(400, {invalidPasswordLength: true, message: "Password must be at least 8 characters long."})
		}

		if (password !== confirmPassword) {
			return fail(400, {passwordsDoNotMatch: true, message: "Passwords did not match."})
		}

		try {
			const req = await fetch(`${VITE_BACKEND_URL}/api/v1/users`, {
				method: "POST",
				headers: {	
					"Content-Type": "application/json"
					},
					body: JSON.stringify({username, password})
				});
			const data = await req.json();
			console.log(data);
			return {success: true, message: "Successfully signed up."};
		} catch(e) {
			return fail(400, {signUpFailed: true, message: e.message});
		}
	}
};