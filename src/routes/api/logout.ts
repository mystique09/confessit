import { serialize } from "cookie";

export async function get() {
  return {
    status: 200,
    headers: {
      'Set-Cookie': serialize('auth', '', {
        path: '/',
        maxAge: 0,
        expires: new Date(0)
      })
    }
  };
}
