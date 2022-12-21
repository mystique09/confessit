<script lang="ts">
	import ArrowUp from '../icons/arrow_up.svelte';

	import Delete from '../icons/delete.svelte';
	import Share from '../icons/share.svelte';

	export let messageId: string;
	export let content: string;
	export let date: string;
	const newDate = new Date(date);
</script>

<label for={messageId} class="modal cursor-pointer flex flex-col gap-1">
	<label class="modal-box relative h-1/2 bg-neutral" for="">
		<span class="text-xs">{newDate.toLocaleDateString()} - {newDate.toLocaleTimeString()}</span>
		<p class="text-xl flex items-center justify-center h-3/4 fo	nt-bold">{content}</p>
	</label>
	<div class="modal-action flex flex-wrap gap-2 flex-row items-center justify-evenly">
		<button class="btn btn-error normal-case font-light hover:rotate-6">
			<Delete /> Delete
		</button>
		<button class="btn btn-info normal-case font-light hover:rotate-6">
			<Share /> Share
		</button>
		<button class="btn btn-success normal-case font-light hover:rotate-6">
			<ArrowUp className="w-6 h-6 rotate-180" /> Download
		</button>
	</div>
</label>
