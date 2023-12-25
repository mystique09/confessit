/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	interface Locals {
		serverStatus: 'online' | 'offline';
		session_id: string;
		access_token: string;
		refresh_token: string;
		user: User;
		user_identity: UserIdentity;
		authenticated: boolean;
	}
	// interface Platform {}
	interface Session {}
	// interface Stuff {}
}

type User = {
	id: string;
	username: string;
	created_at: Date;
	updated_at: Date;
};

type UserIdentity = {
	id: string;
	user_id: string;
	identity_hash: string;
};

type Auth = {
	session_id: string;
	access_token: string;
	refresh_token: string;
	user: User;
	user_identity: UserIdentity;
};

type Message = {
	id: string;
	user_id: string;
	content: string;
	seen: boolean;
	created_at: string;
	updated_at: string;
};

type Post = {
	id: string;
	content: string;
	created_at: string;
	updated_at: string;
	user_identity_id: string;
};

type PostComment = {
	id: string;
	content: string;
	user_identity_id: string;
	post_id: string;
	parent_id: string;
	created_at: string;
	updated_at: string;
};
