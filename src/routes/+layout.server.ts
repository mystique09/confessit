import { parseNonPOJO } from "$lib/helpers/parse_pojo";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
    let authenticated = !!locals.session_id && !!locals.access_token && !!locals.refresh_token && !!locals.user && !!locals.user_identity;

    return {
        authenticated,
        serverStatus: locals.serverStatus,
        user: parseNonPOJO(locals.user),
        user_identity: parseNonPOJO(locals.user_identity),
    };
}) satisfies LayoutServerLoad;