<script lang="ts">
	import MessageCard from '$lib/components/message_card.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>ConfessIt - Dashboard</title>
</svelte:head>

<main>
	<div class="wrap">
		<div class="header">
			<h1>Dashboard</h1>
		</div>
		<div class="message_list">
			{#if data.messages.length === 0}
				<h1>No messages yet.</h1>
				<p class="text-sm mt-2 font-light text-gray-600">
					You can start by sharing your confessit link, found in <a
						class="text-secondary underline"
						href="/dashboard/profile">your profile</a
					>
					page!
				</p>
			{/if}

			{#each data.messages as message (message.id)}
				<MessageCard {message} />
			{/each}
		</div>
	</div>
</main>

<style lang="postcss">
	main {
		@apply max-w-4xl m-auto h-screen w-screen bg-gray-100 px-2;
	}
	.wrap {
		@apply flex flex-col justify-center;
	}
	.header {
		@apply py-8 flex flex-row items-center justify-between;
	}
	.header h1 {
		@apply font-bold text-2xl text-secondary;
	}
	.message_list {
		@apply flex gap-1 flex-wrap;
	}
</style>
