/**@type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const cookie = event.request.headers.get('cookie') || '';
    event.locals.user = cookie.__auth || null;
 
    const response = await resolve(event);
    response.headers.set('x-custom-header', 'confessit-website');
   
    return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
    return event.locals.user;
}