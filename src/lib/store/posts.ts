import { writable } from "svelte/store";

function newPostStore() {
	const { subscribe, set, update } = writable<Post[]>([]);

	function initPosts(posts: Post[]) {
		set(posts);
	}

	function updatePost(postId: string) {
		// TODO!
	}

	function updateData(posts: Post[]) {
		set(posts);
	}

	function deletePost(postId: string) {
		// TODO!
	}

	return {
		subscribe,
		initPosts,
		updatePost,
		updateData,
		deletePost,
	};
}

const postStore = newPostStore();
export default postStore;