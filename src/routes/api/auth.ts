import { serialize } from "cookie";

export async function post() {
  return {
    status: 201,
    body: {
      message: "Login Success."
    },
    headers: {
      "Set-Cookie": serialize('auth', 'testcookie', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
    }
  }
}
