<script lang="ts">
	import EllipsisVertical from '$lib/components/icons/ellipsis_vertical.svelte';
	import EnvelopeClose from '$lib/components/icons/envelope_close.svelte';
	import EnvelopeOpen from '$lib/components/icons/envelope_open.svelte';
	import Show from '$lib/components/shared/show.svelte';

	type Props = {
		isOpen: boolean;
	};

	let { isOpen } = $props<Props>();
</script>

<div class="card w-24 h-24 bg-neutral-content shadow-lg">
	<Show when={!isOpen}>
		<div class="absolute badge badge-error -top-1 -right-1 badge-xs"></div>
	</Show>
	<div class="card-body w-full h-full">
		<div class="absolute top-2 right-2">
			<EllipsisVertical className="h-6 stroke-neutral" />
		</div>
		<Show when={isOpen}>
			<EnvelopeOpen className="w-full h-full stroke-neutral" />

			{#snippet fallback()}
				<EnvelopeClose className="w-full h-full stroke-neutral" />
			{/snippet}
		</Show>
	</div>
</div>