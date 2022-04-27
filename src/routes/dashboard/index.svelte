<script context="module">
	export async function load({ session, fetch }) {
		if (!session) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		const response = await fetch('api/dashboard', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				authorization: `Bearer ${session}`
			}
		});

		const data = await response.json();
		const messages = data.data || [];

		return { status: 200, props: { messages } };
	}
</script>

<script lang="ts">
	type Message = {
		id: number;
		to: string;
		message: string;
		created_at: string;
		deleted_at: string;
	};

	import MessageCard from '$lib/components/message_card.svelte';

	export let messages: Array<Message>;
</script>

<svelte:head>
	<title>ConfessIt - Dashboard</title>
</svelte:head>

<main>
	<div class="wrap">
		<div class="header">
			<h1>Dashboard</h1>
			<div class="sort_wrapper">
				<select name="sort_menu" id="sort_menu">
					<option value="unsorted">Sort</option>
					<option value="id">Sort by id</option>
					<option value="date">Sort by date</option>
				</select>
			</div>
		</div>
		<div class="message_list">
			{#if messages.length === 0}
				<h1>No messages yet.</h1>
			{/if}

			{#each messages as message (message.id)}
				<MessageCard {message} />
			{/each}
		</div>
	</div>
</main>

<style lang="postcss">
	main {
		@apply h-screen w-screen bg-gray-100 px-2;
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
	.sort_wrapper {
		@apply flex flex-col items-start justify-center;
	}
	#sort_menu {
		@apply px-4 py-2 bg-gray-500 rounded-md text-white;
	}
	.message_list {
		@apply flex gap-1 flex-wrap;
	}
</style>
