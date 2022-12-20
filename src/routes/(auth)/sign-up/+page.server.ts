import { VITE_BACKEND_URL } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
	signUp: async function({request, fetch}) {
		const data = await request.formData();
		const username  = data.get("username");
		const password  = data.get("password");
		const confirmPassword = data.get("confirm-password");

		if (!(password && username && confirmPassword)) {
			return fail(400, {missingCredentials: true, message: "Missing username, password, or confirmation password."})
		}

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
			const res = await req.json();
			if(req.status !== 200) {
				return fail(req.status, {signUpFailed: true, message: res.message});
			}

			console.log(res);
			return {success: true, message: "Successfully signed up."};
		} catch(e) {
			return fail(400, {signUpFailed: true, message: e.message});
		}
	}
};