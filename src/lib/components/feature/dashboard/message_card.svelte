<script lang="ts">
	import EnvelopeClose from '$lib/components/icons/envelope_close.svelte';
	import EnvelopeOpen from '$lib/components/icons/envelope_open.svelte';
	import Show from '$lib/components/shared/show.svelte';
	import messageStore from '$lib/store/messages';
	import MessageModal from './message_modal.svelte';

	type Props = {
		isOpen: boolean;
		messageId: string;
		content: string;
		date: string;
	};

	let { isOpen, messageId, content, date } = $props<Props>();

	async function markAsSeen() {
		const res = await fetch(`/dashboard`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message_id: messageId
			})
		});

		if (res.status == 200) {
			messageStore.updateMessage(messageId);
			isOpen = true;
		}
	}

	async function clickHandler() {
		if (!isOpen) {
			await markAsSeen();
		}
	}
</script>

<button
	on:click={clickHandler}
	on:keydown={clickHandler}
	class="btn bg-base-200 w-20 h-20 md:w-24 md:h-24 shadow-lg border-none hover:rotate-6"
>
	<div class="relative h-auto w-full">
		<Show when={!isOpen}>
			<div class="badge badge-error flex items-center badge-xs absolute -top-4 -right-4" />
		</Show>
		<div class="m-auto">
		<Show when={isOpen}>
			<EnvelopeOpen className="w-full h-3/4" />
			{#snippet fallback()}
				<EnvelopeClose className="w-full h-3/4" />
			{/snippet}
		</Show>
		</div>
	</div>
</button>

<input type="checkbox" id={messageId} class="modal-toggle" />
<MessageModal {content} {date} {messageId} />
