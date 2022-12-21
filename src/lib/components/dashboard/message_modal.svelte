<script lang="ts">
	import messageStore from '$lib/store/messages';
	import ArrowUp from '../icons/arrow_up.svelte';
	import Delete from '../icons/delete.svelte';
	import html2canvas from 'html2canvas';

	export let messageId: string;
	export let content: string;
	export let date: string;
	const newDate = new Date(date);
	let isDeleting = false;

	async function deleteMessage() {
		isDeleting = true;
		const res = await fetch(`/dashboard`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message_id: messageId
			})
		});

		if (res.status == 200) {
			messageStore.deleteMessage(messageId);
		}
		isDeleting = false;
	}

	let messageCard: HTMLLabelElement;
	let aElement: HTMLAnchorElement;
	let isDownloading = false;

	async function downloadImage() {
		isDownloading = true;

		const data = await html2canvas(messageCard, {
			width: messageCard.clientWidth,
			height: messageCard.clientHeight,
			allowTaint: true,
			backgroundColor: '#ffffff00'
		});

		const imageData = data.toDataURL('image/png');
		aElement.href = imageData;
		aElement.download = `message-${messageId}.png`;
		aElement.click();
		isDownloading = false;
	}
</script>

<label for={messageId} class="modal cursor-pointer flex flex-col gap-1">
	<a bind:this={aElement} class="hidden" href="/#">y</a>
	<label bind:this={messageCard} class="modal-box relative h-1/2 bg-neutral" for="">
		<span class="text-xs">{newDate.toLocaleDateString()} - {newDate.toLocaleTimeString()}</span>
		<p class="text-xl flex items-center justify-center h-3/4 fo	nt-bold">{content}</p>
	</label>
	<div class="modal-action flex flex-wrap gap-2 flex-row items-center justify-evenly">
		<button
			type="button"
			on:click={deleteMessage}
			class="btn btn-error normal-case font-light hover:rotate-6"
			class:btn-disabled={isDeleting}
			class:loading={isDeleting}
		>
			{#if !isDeleting}
				<Delete />
			{/if}
			Delete
		</button>
		<button
			on:click={downloadImage}
			class="btn btn-success normal-case font-light hover:rotate-6"
			class:btn-disabled={isDownloading}
			class:loading={isDownloading}
		>
			{#if !isDownloading}
				<ArrowUp className="w-6 h-6 rotate-180" />
			{/if}
			Download
		</button>
	</div>
</label>
