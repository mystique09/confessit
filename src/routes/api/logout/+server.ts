import { json } from '@sveltejs/kit';
import { serialize } from "cookie";

export async function POST() {
  return json({
  message: "Signed out."
}, {
    headers: {
      'Set-Cookie': serialize('session_token', null, {
        path: '/',
        maxAge: -1,
        httpOnly: true
      })
    }
  });
}
