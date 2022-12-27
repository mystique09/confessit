<script lang="ts">
	import CreatePost from '$lib/components/wall/create_post.svelte';
	import Post from '$lib/components/wall/post.svelte';
	import postStore from '$lib/store/posts';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		postStore.initPosts(data.posts.data);
	});
</script>

<svelte:head>
	<title>CNFS - Public wall</title>
	<meta name="description" content="Welcome to the CNFS public wall!" />
</svelte:head>

{#if data.authenticated}
	<CreatePost />
{/if}
<div class="min-h-screen px-4 w-full">
	<div class="wrap md:mt-12 w-full h-full lg:flex lg:flex-row lg:justify-evenly m-auto">
		{#if $postStore.length > 0}
			<div class="posts flex flex-col items-center h-full lg:w-1/2 gap-2">
				{#each $postStore as post}
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