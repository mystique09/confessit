import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
 
export const load = (async ({ parent }) => {
	const {authenticated, user, user_identity} = await parent();

	if(!authenticated) {
		throw redirect(301, "/sign-in");
	}

	return {
		user, user_identity
	};
}) satisfies PageServerLoad;