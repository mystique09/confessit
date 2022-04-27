import { serialize } from "cookie";

export async function post() {
  return {
    status: 200,
    headers: {
      'Set-Cookie': serialize('session_token', null, {
        path: '/',
        maxAge: -1,
        httpOnly: true
      })
    },
    body: {
      message: "Signed out."
    }
  };
}
