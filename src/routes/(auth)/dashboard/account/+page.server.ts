import { VITE_BACKEND_URL } from "$env/static/private";
import { error, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { Actions } from "./$types";

export const load = (async ({ parent, fetch }) => {
	const {serverStatus} = await parent();

	if(serverStatus === "offline") {
		throw error(404, {message: "server is offline."});
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	updateAccountUsername: async function({request, locals, fetch}) {
		const data = await request.formData();
		const username = data.get("username");
		const sessionId = locals.session_id;

		try {
			const req = await fetch(`${VITE_BACKEND_URL}/api/v1/users/${locals.user.id}`, {
				method: "PATCH",
				headers: {
					'content-type': 'application/json',
					'authorization': `Bearer ${locals.access_token}`
				},
				body: JSON.stringify({field: 'username', payload: username.toString(), session_id: sessionId})
			});
			const res = await req.json();
			console.log(res);
			const {data} = res;

			if (req.status !== 200) {
				return fail(req.status, {
					failedAccountUpdate: true,
					message: data.message
				});
			}
			
			return {updateSuccess: true, message: "Username updated successfully!"};
		} catch(e) {
			return fail(e.status, {
				failedAccountUpdate: true,
				message: "Something went wrong updating your username, please try again later."
			});
		}
	},
	updateAccountPassword: async function({request, locals, fetch}) {
		const data = await request.formData();
		const newPassword = data.get("newPassword");
		const confirmPassword = data.get("confirmPassword");
		const sessionId = locals.session_id;

		if(!(newPassword && confirmPassword)){
			return fail(400, {
				failedAccountUpdate: true,
				message: "Please fill out all fields"
			});
		}

		if(newPassword.length < 8){
			return fail(400, {
				failedAccountUpdate: true,
				message: "Password must be at least 8 characters"
			});
		}

		if (newPassword !== confirmPassword) {
			return fail(400, {
				failedAccountUpdate: true,
				message: "Passwords do not match"
			});
		}

		try {
			const req = await fetch(`${VITE_BACKEND_URL}/api/v1/users/${locals.user.id}`, {
				method: "PATCH",
				headers: {
					'content-type': 'application/json',
					'authorization': `Bearer ${locals.access_token}`
				},
				body: JSON.stringify({field: 'password', payload: newPassword.toString(), session_id: sessionId})
			});
			const res = await req.json();
			console.log(res);
			const {data} = res;

			if (req.status !== 200) {
				return fail(req.status, {
					failedAccountUpdate: true,
					message: data.message
				});
			}

			return {updateSuccess: true, message: "Password updated successfully!"};
		} catch(e) {
			return fail(e.status, {
				failedAccountUpdate: true,
				message: "Something went wrong updating your password, please try again later."
			});
		}
	}
};