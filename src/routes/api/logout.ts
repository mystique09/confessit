import { serialize } from "cookie";

export async function get() {
  return {
    status: 200,
    headers: {
      "Set-Cookie": serialize('auth', null, {
        maxAge: -1,
        path: '/',
        //httpOnly: true
      })
    }
  };
}
