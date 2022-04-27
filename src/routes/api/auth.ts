import { serialize } from "cookie";

export async function post({ request }) {
  const response = await fetch("http://localhost:5000/auth", {
    method: "POST",
    body: request.body,
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  });
  const { status, message, data } = await response.json();

  if (status === "error") {
    return {
      status: response.status,
      body: { status, message }
    }
  }

  return {
    status: 200,
    body: {
      status, message
    },
    headers: {
      "Set-Cookie": serialize('session_token', data, {
        path: '/',
        maxAge: 60 * 60 * 10,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
    }
  }
}
