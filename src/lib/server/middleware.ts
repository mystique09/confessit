import { NODE_ENV } from "$env/static/private";
import { redirect, type RequestEvent } from "@sveltejs/kit";
import { checkServerHealth } from "./health";
import {
	endSession,
	requestNewAccessToken,
	validateAccessToken,
} from "./refreshToken";

export async function interceptRequestEvent(
	event: RequestEvent<Partial<Record<string, string>>, string>,
	auth: Auth,
) {
	if (await checkServerHealth()) {
		event.locals.serverStatus = "online";
	} else {
		event.locals.serverStatus = "offline";
	}

	if (event.locals.serverStatus === "online") {
		if (
			auth.access_token &&
			auth.refresh_token &&
			auth.user &&
			auth.user_identity
		) {
			if (!(await validateAccessToken(auth.access_token))) {
				let newAccessToken = await requestNewAccessToken(auth.refresh_token);

				if (newAccessToken.access_token === "") {
					await endSession(event.fetch);
					console.log("logging out");
					auth.access_token = "";
					auth.refresh_token = "";
					auth.user = {} as User;
					auth.user_identity = {} as UserIdentity;
				} else {
					console.log(`Refreshed token for ${auth.user.id}}`);
					auth.access_token = newAccessToken.access_token;
					event.cookies.set("access_token", newAccessToken.access_token, {
						path: "/",
						httpOnly: true,
						maxAge: new Date(newAccessToken.access_token_expiry).getTime(),
						secure: NODE_ENV === "production",
					});
				}
			}
		}
	}

	event.locals.session_id = auth.session_id;
	event.locals.access_token = auth.access_token;
	event.locals.refresh_token = auth.refresh_token;
	event.locals.user = auth.user;
	event.locals.user_identity = auth.user_identity;
}

export async function interceptRoute(
	event: RequestEvent<Partial<Record<string, string>>, string>,
	auth: Auth,
) {
	if (event.url.pathname.startsWith("/dashboard")) {
		if (
			!(
				auth.access_token &&
				auth.refresh_token &&
				auth.user &&
				auth.user_identity
			)
		) {
			console.log("redirecting...");
			throw redirect(301, "/sign-in");
		}
	}

	if (
		event.url.pathname.startsWith("/sign") ||
		event.url.pathname.startsWith("/forgot-password")
	) {
		if (
			auth.access_token &&
			auth.refresh_token &&
			auth.user &&
			auth.user_identity
		) {
			throw redirect(301, "/dashboard");
		}
	}
}
