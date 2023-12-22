<script lang="ts">
	import MessageCard from '$lib/components/feature/message/message_card.svelte';

	let messages: boolean[] = [false, false, false, true, true, true, true, true, true];
</script>

<div class="card max-w-sm w-full h-auto bg-white">
	<div class="card-body">
		<h1 class="card-title flex items-center w-full justify-center">
			<img class="h-16" src="favicon.png" alt="CNFS Logo" />
		</h1>
		<div class="flex flex-wrap gap-2 items-center justify-start">
			{#each messages as message}
				<MessageCard isOpen={message} />
			{/each}
		</div>
	</div>
</div>
