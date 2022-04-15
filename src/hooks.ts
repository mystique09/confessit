import { parse } from "cookie";

/**@type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const cookies = parse(event.request.headers.get('cookie') || '');

  event.locals.user = cookies.auth != '' ? cookies.auth : '';

  const response = await resolve(event);
  return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  return event.locals.user;
}
