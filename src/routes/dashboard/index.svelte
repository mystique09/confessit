<script context="module">
	export async function load({ session }) {
		if (!session) {
			return {
				status: 302,
				redirect: '/login'
			};
		}

		let date = 'April 1, 2022';

		let messages = [
			{
				id: 1,
				content:
					'Hello, I just want to say that you are so pretty. I have a crush on you since Elementary :) <3. Im too shy to confess personally.',
				created_at: date
			},
			{ id: 2, content: 'Hello', created_at: date },
			{ id: 3, content: 'Hello, bitch', created_at: date },
			{ id: 4, content: '<3', created_at: date },
			{ id: 5, content: 'Hello', created_at: date },
			{ id: 6, content: 'Hello', created_at: date },
			{ id: 7, content: 'Hello', created_at: date },
			{ id: 8, content: 'Hello', created_at: date }
		];

		return { status: 200, props: { messages } };
	}
</script>

<script lang="ts">
	interface Message {
		id: number;
		content: string;
		created_at: string;
	}

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
