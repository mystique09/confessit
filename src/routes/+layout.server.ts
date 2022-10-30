export async function load({ locals }) {
    return {
        authenticated: !!locals.session?.token,
        name: locals.session.name
    };
}