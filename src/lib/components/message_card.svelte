<script lang="ts">
	type Message = {
		id: number;
		to: string;
		message: string;
		created_at: string;
		deleted_at: string;
	};

	export let message: Message;
</script>

<div class="card">
	<h3>Received on {new Date(message.created_at).toUTCString()}</h3>
	<p>{message.message}</p>
</div>

<style lang="postcss">
	.card {
		@apply bg-purple-600 md:w-1/4 rounded-md w-full h-full mb-2 px-4 py-6;
	}
	h3 {
		@apply font-bold text-xs text-gray-400;
	}
	p {
		@apply overflow-scroll mt-4 font-normal text-gray-300 text-sm;
	}
</style>
