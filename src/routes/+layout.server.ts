export async function load({ locals }) {
    return {
        session: locals.session,
        name: locals.session.name
    };
}