<script lang="ts">
	import Delete from '../icons/delete.svelte';
	import Share from '../icons/share.svelte';

	export let messageId: string;
	export let content: string;
	export let date: string;
</script>

<label for={messageId} class="modal cursor-pointer flex flex-col gap-1">
	<label class="modal-box relative h-1/2 bg-neutral" for="">
		<span class="text-xs">{new Date(date).toUTCString()}</span>
		<p class="text-xl flex items-center justify-center h-3/4 fo	nt-bold">{content}</p>
	</label>
	<div class="modal-action flex flex-row items-center justify-evenly">
		<button class="btn btn-error">
			<Delete />
		</button>
		<button class="btn btn-success">
			<Share />
		</button>
	</div>
</label>