/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
    interface Locals {
        session_id: string;
		access_token: string;
		refresh_token: string;
		user: {
			id: string;
			username: string;
			created_at: Date;
			updated_at: Date;
		};
		user_identity: {
			id: string;
			user_id: string;
			identity_hash: string;
		};
        authenticated: boolean;
    }
    // interface Platform {}
    interface Session { }
    // interface Stuff {}
}