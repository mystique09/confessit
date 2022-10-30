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
	<div class="card-heading">
		<span>{new Date(message.created_at).toDateString()}</span>
	</div>
	<p>{message.message}</p>
</div>

<style lang="postcss">
	.card {
		@apply bg-secondary/30 rounded-md w-full h-24 mb-2 px-4 py-2;
	}

	.card .card-heading {
		@apply flex items-center justify-between;
		@apply mt-2 mb-4;
	}

	.card-heading > span {
		@apply font-bold text-xs text-black;
	}

	p {
		@apply text-black text-sm;
	}
</style>
