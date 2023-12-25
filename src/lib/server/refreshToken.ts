import { VITE_BACKEND_URL } from '$env/static/private';

export async function validateAccessToken(accessToken: string): Promise<boolean> {
	try {
		const req = await fetch(`${VITE_BACKEND_URL}/api/v1/auth/validate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ access_token: accessToken })
		});

		if (req.status !== 200) {
			console.log(req.status);
			return false;
		}

		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}

export async function requestNewAccessToken(
	refreshToken: string
): Promise<{ access_token: string; access_token_expiry: string }> {
	try {
		const refresh = await fetch(`${VITE_BACKEND_URL}/api/v1/auth/refresh`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ refresh_token: refreshToken })
		});

		if (refresh.status !== 200) {
			return { access_token: '', access_token_expiry: '' };
		}

		const refreshData = await refresh.json();
		const { data } = refreshData;
		return data;
	} catch (e) {
		return { access_token: '', access_token_expiry: '' };
	}
}

export async function endSession(
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>
) {
	try {
		const req = await fetch('/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const res = await req.json();
	} catch (e) {
		console.log(e);
	}
}
