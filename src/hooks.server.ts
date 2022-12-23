import { NODE_ENV, VITE_BACKEND_URL } from "$env/static/private";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    let sessionId = event.cookies.get("session_id") ?? "";
    let accessToken = event.cookies.get("access_token") ?? "";
    let refreshToken = event.cookies.get("refresh_token") ?? "";
    let user = JSON.parse(event.cookies.get("user") ?? "{}");
    let userIdentity = JSON.parse(event.cookies.get("user_identity") ?? "{}");

    if (await checkServerHealth()) {
        event.locals.serverStatus = "online";
    } else {
        event.locals.serverStatus = "offline";
    }

    if (event.locals.serverStatus === "online") {
        if (sessionId && accessToken && refreshToken && user && userIdentity) {
            if (!await validateAccessToken(accessToken)) {
                let newAccessToken = await requestNewAccessToken(refreshToken);

                if (newAccessToken.access_token === "") {
                    await endSession();
                    throw redirect(301, "/sign-in");
                }

                console.log(Date.now(), user.id, newAccessToken.access_token_expiry)
                accessToken = newAccessToken.access_token;

                event.cookies.set("access_token", newAccessToken.access_token, {
                    path: "/",
                    httpOnly: true,
                    maxAge: new Date(newAccessToken.access_token_expiry).getTime(),
                    secure: NODE_ENV === "production",
                });
            }
        }
    }

    if (event.url.pathname.startsWith("/dashboard")) {
        if (!(sessionId && accessToken && refreshToken && user && userIdentity)) {
            throw redirect(301, "/sign-in");
        }
    }

    if (
        event.url.pathname.startsWith("/sign") ||
        event.url.pathname.startsWith("/forgot-password")
    ) {
        if (sessionId && accessToken && refreshToken && user && userIdentity) {
            throw redirect(301, "/dashboard");
        }
    }

    event.locals.session_id = sessionId;
    event.locals.access_token = accessToken;
    event.locals.refresh_token = refreshToken;
    event.locals.user = user;
    event.locals.user_identity = userIdentity;

    const response = await resolve(event);
    return response;
};

async function checkServerHealth(): Promise<boolean> {
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

async function validateAccessToken(accessToken: string): Promise<boolean> {
    try {
        const req = await fetch(`${VITE_BACKEND_URL}/api/v1/auth/validate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ access_token: accessToken }),
        });

        if (req.status !== 200) {
            console.log(req.status)
            return false;
        }

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function requestNewAccessToken(refreshToken: string): Promise<{ access_token: string, access_token_expiry: string }> {
    try {
        const refresh = await fetch(`${VITE_BACKEND_URL}/api/v1/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (refresh.status !== 200) {
            return { access_token: "", access_token_expiry: "" };
        }

        const refreshData = await refresh.json();
        const { data } = refreshData;
        return data;
    } catch (e) {
        return { access_token: "", access_token_expiry: "" };
    }
}

async function endSession() {
    try {
        const req = await fetch('/logout', {
            method: 'POST'
        });

        if (req.status !== 200) {
            console.log("error while logging out");
        }

        console.log("logged out!");
        throw redirect(301, "/sign-in");
    } catch (e) {
        console.log("error while logging out");
    }
}