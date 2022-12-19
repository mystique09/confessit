import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ parent }) => {
	const {authenticated} = await parent();

	if(authenticated) {
		throw redirect(301, "/dashboard");
	}

	return {};
}) satisfies PageServerLoad;