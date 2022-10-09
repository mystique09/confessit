export async function POST({cookies, request}) {
  cookies.set("Set-Cookie", null, {
      maxAge: -1,
      path: '/',
  });
  console.log(request.headers)
  return new Response('Logged out!');
}