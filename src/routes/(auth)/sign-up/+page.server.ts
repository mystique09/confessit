import { RECAPTCHA_SECRET_KEY, VITE_BACKEND_URL } from '$env/static/private';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	signUp: async function ({ request, fetch, locals }) {
		if (locals.serverStatus === 'offline') {
			return fail(404, { signUpFailed: true, message: 'Server is offline.' });
		}

		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');
		const confirmPassword = data.get('confirm-password');
		const gRecaptchaToken = data.get('token');

		if (!(password && username && confirmPassword)) {
			return fail(400, {
				missingCredentials: true,
				message: 'Missing username, password, or confirmation password.'
			});
		}

		if (username.toString().length < 8) {
			return fail(400, {
				invalidUsernameLength: true,
				message: 'Username must be at least 8 characters long.'
			});
		}

		if (password.toString().length < 8) {
			return fail(400, {
				invalidPasswordLength: true,
				message: 'Password must be at least 8 characters long.'
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				passwordsDoNotMatch: true,
				message: 'Passwords did not match.'
			});
		}

		if (!gRecaptchaToken) {
			return fail(400, {
				missingRecaptchaToken: true,
				message: 'Please verify that you are not a robot.'
			});
		}

		try {
			const verifyRequest = await fetch(
				`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${gRecaptchaToken}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
			);

			const verifyResponse = await verifyRequest.json();

			if (!verifyResponse.success) {
				return fail(400, {
					invalidRecaptchaToken: true,
					message: "Human verification failed, are you sure you're not a robot?"
				});
			}

			const req = await fetch(`${VITE_BACKEND_URL}/api/v1/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, password })
			});

			const res = await req.json();
			if (req.status !== 200) {
				return fail(req.status, { signUpFailed: true, message: res.message });
			}

			console.log(res);
			return { success: true, message: 'Successfully signed up.' };
		} catch (e) {
			return fail(400, { signUpFailed: true, message: e.message });
		}
	}
};
