import type { PageServerLoad } from './$types';
 
export const load = (async ({ parent }) => {
	const {user, user_identity} = await parent();

	return {
		user, user_identity
	};
}) satisfies PageServerLoad;