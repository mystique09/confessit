<script>
	import { page } from '$app/stores';

	const emojiChoice = $page.status === 404 ? '😕' : $page.status === 403 ? '🤥' : '🤔';
</script>

<svelte:head>
	<title>NOT FOUND</title>
</svelte:head>

<div class="h-screen flex flex-col items-center justify-center px-4">
	<h1 class="text-8xl m-7">{emojiChoice}</h1>
	<p class="font-bold text-4xl">Error: {$page.status}, {$page.error.message}</p>
	<p class="text-sm mt-2">
		{#if $page.status === 404}
			We're sorry, but it looks like the page you are trying to view is no longer available.
		{:else if $page.status === 403}
			You do not have permission to access this page. Status 403: Forbidden.
		{:else}
			An internal server error has occurred. Please try again later.
		{/if}
	</p>
</div>
