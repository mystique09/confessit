<script lang="ts">
	import ArrowUp from '$lib/components/icons/arrow_up.svelte';
	import Delete from '$lib/components/icons/delete.svelte';
	import Show from '$lib/components/shared/show.svelte';
	import messageStore from '$lib/store/messages';
	import html2canvas from 'html2canvas';

	type Props = {
		messageId: string;
		content: string;
		date: string;
	};

	let { messageId, content, date } = $props<Props>();

	let isDeleting = $state(false);
	let isDownloading = $state(false);

	const newDate = new Date(date);

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

	let messageCard = $state<HTMLLabelElement>();
	let aElement = $state<HTMLAnchorElement>();

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
	<label
		bind:this={messageCard}
		class="modal-box relative flex flex-col items-start justify-between h-full bg-neutral max-h-[350px]"
		for=""
	>
		<span class="text-xs">{newDate.toLocaleDateString()} - {newDate.toLocaleTimeString()}</span>
		<p class="text-xs h-3/4 text-center w-full font-bold break-words">{content}</p>
	</label>
	<div class="modal-action flex flex-wrap gap-2 flex-row items-center justify-evenly">
		<button
			type="button"
			on:click={deleteMessage}
			class="btn btn-error normal-case font-light hover:rotate-6"
			class:btn-disabled={isDeleting}
			class:loading={isDeleting}
		>
			<Show when={!isDeleting}>
				<Delete />
			</Show>
			Delete
		</button>
		<button
			on:click={downloadImage}
			class="btn btn-success normal-case font-light hover:rotate-6"
			class:btn-disabled={isDownloading}
			class:loading={isDownloading}
		>
			<Show when={isDownloading}>
				<ArrowUp className="w-6 h-6 rotate-180" />
			</Show>
			Download
		</button>
	</div>
</label>
