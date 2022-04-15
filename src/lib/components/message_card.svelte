<script lang="ts">
	type Message = {
		id: number;
		content: string;
		created_at: string;
	};

	export let message: Message;
</script>

<div class="card">
	<h3>Received on {message.created_at}</h3>
	<p>{message.content}</p>
</div>

<style lang="postcss">
	.card {
		@apply md:w-1/4 rounded-md w-full h-full bg-gray-600 mb-2 px-4 py-6;
	}
	h3 {
		@apply font-bold text-xs text-gray-400;
	}
	p {
		@apply overflow-scroll mt-4 font-normal text-white text-sm;
	}
</style>

