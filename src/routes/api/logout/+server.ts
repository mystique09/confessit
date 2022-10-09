import { json } from '@sveltejs/kit';

export async function POST({setHeaders, request}) {
  setHeaders({
    cookie: {
      name: null,
      maxAge: -1,
    }
  });
  return new Response('Logged out!');
}