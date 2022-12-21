<script lang="ts">
	import MessageCard from '$lib/components/dashboard/message_card.svelte';
	import messageStore from '$lib/store/messages';
	import type { PageData } from './$types';

	export let data: PageData;
	messageStore.initMessages(data.messages);
</script>

<svelte:head>
	<title>CNFS - Dashboard</title>
	<meta name="description" content="Welcome to your dashboard" />
</svelte:head>

<div class="dashboard w-full h-screen bg-base py-6 px-4">
	<h1 class="text-white text-2xl md:text-4xl mb-8">Dashboard</h1>
	<div class="flex items-center justify-start flex-wrap gap-4">
		{#if $messageStore.length == 0}
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