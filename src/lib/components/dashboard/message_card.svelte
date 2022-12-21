<script lang="ts">
	import messageStore from '$lib/store/messages';
	import EnvelopeClose from '../icons/envelope_close.svelte';
	import EnvelopeOpen from '../icons/envelope_open.svelte';
	import MessageModal from './message_modal.svelte';

	export let isOpen: boolean = false;
	export let messageId: string;
	export let content: string;
	export let date: string;

	async function markAsSeen() {
		const res = await fetch(`/dashboard`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message_id: messageId,
			}),
		});

		if (res.status == 200) {
			messageStore.updateMessage(messageId);
			isOpen = true;
		}
	}

	async function clickHandler() {
		if (!isOpen){
			await markAsSeen();
		}
	}
</script>

<label
	on:click={clickHandler}
	on:keydown={clickHandler}
	for={messageId}
	class="btn bg-base-200 w-20 h-20 md:w-24 md:h-24 shadow-lg border-none hover:rotate-6"
>
	<div class="relative h-auto w-full">
		{#if !isOpen}
			<div class="badge badge-error flex items-center badge-xs absolute -top-4 -right-4" />
		{/if}
		<div class="m-auto">
			{#if isOpen}
				<EnvelopeOpen className="w-full h-3/4" />
			{:else}
				<EnvelopeClose className="w-full h-3/4" />
			{/if}
		</div>
	</div>
</label>

<input type="checkbox" id={messageId} class="modal-toggle" />
<MessageModal {content} {date} {messageId} />
