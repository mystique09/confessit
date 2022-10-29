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
		<div class="message_list flex flex-col">
			{#if data.messages.length === 0}
				<h1>No messages yet.</h1>
				<p class="alert alert-info">
					You can start by sharing your confessit link, found in <a
						class="underline"
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
		@apply h-screen w-screen px-2;
	}

	.wrap {
		@apply flex flex-col justify-center max-w-lg m-auto;
	}

	.header {
		@apply py-8 flex flex-row items-center justify-between;
	}

	.header h1 {
		@apply font-bold text-2xl;
	}

	.message_list {
		@apply flex gap-1 flex-wrap;
	}
</style>
