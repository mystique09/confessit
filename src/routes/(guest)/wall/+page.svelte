<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Post from '$lib/components/feature/wall/post.svelte';
	import Check from '$lib/components/icons/check.svelte';
	import Delete from '$lib/components/icons/delete.svelte';
	import Globe from '$lib/components/icons/globe.svelte';
	import Info from '$lib/components/icons/info.svelte';
	import Send from '$lib/components/icons/send.svelte';
	import Show from '$lib/components/shared/show.svelte';
	import postStore from '$lib/store/posts';
	import { getContext } from 'svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();
	let ctx: { isAuthenticated: boolean } = getContext('userAuth');

	let modalRef = $state<HTMLDivElement>();

	let isLoading = $state(false);
	let hasError = $state(form?.postFailed);
	let message = $state(form?.message);

	let currentPage = $state(Number($page.url.searchParams.get('page')) || 0);
	let previousPage = $derived(currentPage <= 0 ? currentPage : currentPage - 1);
	let nextPage = $derived(data.hasNext ? currentPage + 1 : currentPage);

	const resetForm = () => {
		message = '';
		hasError = false;
	};

	const handleSubmit = () => {
		isLoading = true;
	};

	$effect(() => {
		postStore.initPosts(data.posts);
	});

	$effect(() => {
		if (form?.newPostSuccess) {
			isLoading = false;
			location.reload();
		}

		if (form?.postFailed) {
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<title>CNFS - Public wall</title>
	<meta name="description" content="Welcome to the CNFS public wall!" />
</svelte:head>

<Show when={ctx.isAuthenticated}>
	<label
		for="create_modal"
		class="fixed z-10 bottom-6 right-6 bg-neutral w-16 h-16 flex items-center justify-center rounded-full btn btn-ghost"
	>
		<Globe className="w-full h-full" />
	</label>

	<input type="checkbox" id="create_modal" class="modal-toggle" />
	<div bind:this={modalRef} class="modal">
		<div class="modal-box h-full">
			<h3 class="modal-title font-bold text-lg text-center">
				Create new post, and let the public know.
			</h3>
			<p class="py-4">Say whatever you want, and please follow the guidelines.</p>
			<Show when={hasError}>
				<div class="alert alert-xs alert-warning mb-2 flex flex-row items-center justify-between">
					<Info />
					<span class="text-sm"> {message}</span>
				</div>
			</Show>
			<Show when={form?.newPostSuccess}>
				<div class="alert alert-xs alert-success mb-2 flex flex-row items-center justify-between">
					<Check />
					<span class="text-sm"> {message}</span>
				</div>
			</Show>
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
					<button
						on:click={resetForm}
						on:keydown={resetForm}
						class="btn btn-error normal-case gap-2"
					>
						<Delete /> Cancel
					</button>
					<button
						on:click={handleSubmit}
						class:loading={isLoading}
						class:btn-disabled={isLoading}
						class="btn btn-success normal-case gap-2"
					>
						<Send /> Submit
					</button>
				</div>
			</form>
		</div>
	</div>
</Show>

<div class="min-h-screen px-2 md:px-4 w-full">
	<div class="btn-group grid grid-cols-2 max-w-md mb-6 m-auto">
		<a
			href={`/wall?page=${previousPage}`}
			class:btn-disabled={currentPage <= 0}
			class="btn btn-outline">Previous page</a
		>
		<a href={`/wall?page=${nextPage}`} class:btn-disabled={!data.hasNext} class="btn btn-outline"
			>Next</a
		>
	</div>
	<div class="wrap md:my-4 w-full h-full lg:flex lg:flex-row lg:justify-evenly m-auto">
		<Show when={data.posts.length > 0}>
			<div class="posts flex flex-col items-center h-full lg:w-1/2 gap-2">
				{#each data.posts as post}
					<Post item={post} />
				{/each}
			</div>

			{#snippet fallback()}
				<div class="flex flex-col items-center justify-center h-full">
					<h1 class="lg:text-sm">
						It's either no one posted yet or you already reached the last post.
					</h1>
				</div>
			{/snippet}
		</Show>

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
