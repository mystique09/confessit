import { VITE_BACKEND_URL } from "$env/static/private";

export async function checkServerHealth(): Promise<boolean> {
	try {
		const req = await fetch(`${VITE_BACKEND_URL}/health`);
		if (req.status !== 200) {
			return false;
		}

		return true;
	} catch (e) {
		return false;
	}
}