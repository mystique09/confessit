import type { MaybePromise, RequestEvent, RequestOptions } from "@sveltejs/kit/types/private";
import { parse } from "cookie";

/**@type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }: { event: RequestEvent, resolve: (event: RequestEvent, opts?: RequestOptions) => MaybePromise<Response> }) {
  const cookies = parse(event.request.headers.get('cookie') || "");
  
  event.locals.user = cookies.cookie ? JSON.parse(cookies.cookie) : null;

  const response = await resolve(event);
  return response;
}