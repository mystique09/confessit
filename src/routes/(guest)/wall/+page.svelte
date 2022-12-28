<script lang="ts">
	import { enhance } from '$app/forms';
	import Delete from '$lib/components/icons/delete.svelte';
	import Globe from '$lib/components/icons/globe.svelte';
	import Info from '$lib/components/icons/info.svelte';
	import Send from '$lib/components/icons/send.svelte';
	import Post from '$lib/components/wall/post.svelte';
	import postStore from '$lib/store/posts';
	import { onMount } from 'svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: if (form?.newPostSuccess) {
		location.reload();
	}

	$: hasError = form?.postFailed;
	$: message = form?.message;

	onMount(() => {
		postStore.initPosts(data.posts.data);
	});

	const resetForm = () => {
		message = "";
		hasError = false;
	};
</script>

<svelte:head>
	<title>CNFS - Public wall</title>
	<meta name="description" content="Welcome to the CNFS public wall!" />
</svelte:head>

{#if data.authenticated}
	<label
		for="create_modal"
		class="fixed z-10 bottom-6 right-6 bg-neutral w-16 h-16 flex items-center justify-center rounded-full btn btn-ghost"
	>
		<Globe className="w-full h-full" />
	</label>

	<input type="checkbox" id="create_modal" class="modal-toggle" />
	<div class="modal">
		<div class="modal-box h-full">
			<h3 class="modal-title font-bold text-lg text-center">
				Create new post, and let the public know.
			</h3>
			<p class="py-4">Say whatever you want, and please follow the guidelines.</p>
			{#if hasError}
				<div class="alert alert-xs alert-warning mb-2 flex flex-row items-center justify-between">
					<Info />
					<span class="text-sm"> {message}</span>
				</div>
			{/if}
			<form class="w-full m-auto" method="POST" action="?/createNewPost" use:enhance>
				<textarea
					class="textarea textarea-primary w-full resize-none"
					name="content"
					placeholder="What's on your mind?"
					id="content"
					cols="30"
					rows="10"
				/>
				<div class="modal-action flex flex-row items-center justify-around">
					<label
						on:click={resetForm}
						on:keydown={resetForm}
						for="create_modal"
						class="btn btn-error normal-case gap-2"
					>
						<Delete /> Cancel
					</label>
					<button class="btn btn-success normal-case gap-2">
						<Send /> Submit
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<div class="min-h-screen px-2 md:px-4 w-full">
	<div class="wrap md:my-4 w-full h-full lg:flex lg:flex-row lg:justify-evenly m-auto">
		{#if data.posts.data.length > 0}
			<div class="posts flex flex-col items-center h-full lg:w-1/2 gap-2">
				{#each data.posts.data as post}
					<Post item={post} />
				{/each}
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center h-full">
				<h1 class="text-xl lg:text-4xl">No post yet, be the first one!</h1>
			</div>
		{/if}
		<div class="w-1/4">
			<div class="guidelines_card h-56 w-full bg-neutral hidden lg:flex lg:flex-col p-4">
				<ul class="text-xs flex flex-col gap-2">
					<li><a class="hover:underline" href="/#privacy-policy">Privacy policy</a></li>
					<li><a class="hover:underline" href="/#guidelines">Guidelines</a></li>
					<li><a class="hover:underline" href="/#faq">FAQ</a></li>
				</ul>
				<div class="divider" />
				<ul class="text-xs flex flex-col gap-2">
					<a href="https://github.com/mystique09/confessit" class="link link-hover">Github</a>
					<a href="https://twitter.com/voidthebug" class="link link-hover">Twitter</a>
					<a href="https://github.com/mystique09" class="link link-hover">Linkedin</a>
				</ul>
			</div>
		</div>
	</div>
</div>
