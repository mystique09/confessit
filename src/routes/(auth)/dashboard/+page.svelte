<script lang="ts">
	import { page } from '$app/stores';
	import MessageCard from '$lib/components/dashboard/message_card.svelte';
	import Reload from '$lib/components/icons/reload.svelte';
	import messageStore from '$lib/store/messages';
	import type { PageData } from './$types';

	export let data: PageData;
	messageStore.initMessages(data.messages);

	let isFetchingLatestData = false;
	async function fetchLatestData() {
		isFetchingLatestData = true;
		try {
			const res = await fetch('/dashboard', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const messages = await res.json();
			isFetchingLatestData = false;
			messageStore.updateData(messages);
		} catch (e) {
			console.log(e);
		}
		isFetchingLatestData = false;
	}
</script>

<svelte:head>
	<title>CNFS - Dashboard</title>
	<meta name="description" content="Welcome to your dashboard" />
</svelte:head>

<div class="dashboard w-full h-screen bg-base py-6 px-4">
	<div class="wrap flex flex-row items-start justify-between max-w-2xl">
		<div class="wrap">
			<h1 class="text-white text-2xl md:text-4xl mb-2">Dashboard</h1>
			<p>
				Share your link:
				<span class="link link-spanrimary text-sm"
					>{$page.url.protocol}//{$page.url.host}/u/{$page.data.user.username}</span
				>
			</p>
		</div>
		<button
			on:click={fetchLatestData}
			type="button"
			class="btn btn-circle btn-ghost btn-md"
			class:btn-disabled={isFetchingLatestData}
			class:loading={isFetchingLatestData}
		>
			{#if !isFetchingLatestData}
				<Reload className="w-6 h-6 stroke-success" />
			{/if}
		</button>
	</div>
	<div class="flex items-center justify-start flex-wrap gap-4 mt-8 max-w-2xl">
		{#if $messageStore && $messageStore.length == 0}
			<div class="text-white text-xl md:text-2xl">
				<h1 class="text-2xl">No messages</h1>
				<p class="text-sm">You can start by sharing your link to your friends.</p>
			</div>
		{:else}
			{#each $messageStore as message (message.id + message.content)}
				<MessageCard
					content={message.content}
					date={message.created_at}
					messageId={message.id}
					isOpen={!!message.seen}
				/>
			{/each}
		{/if}
	</div>
</div>