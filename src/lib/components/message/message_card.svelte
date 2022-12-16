<script lang="ts">
	import EllipsisVertical from "../icons/ellipsis_vertical.svelte";
	import EnvelopeClose from "../icons/envelope_close.svelte";
	import EnvelopeOpen from "../icons/envelope_open.svelte";

	export let isOpen: boolean = false;
</script>

<div class="card w-24 h-24 bg-neutral-content shadow-lg">
	{#if !isOpen}
		<div class="absolute badge badge-error -top-1 -right-1 badge-xs"></div>
	{/if}
	<div class="card-body w-full h-full">
		<div class="absolute top-2 right-2">
			<EllipsisVertical className="h-6 stroke-neutral" />
		</div>
		{#if isOpen}
			<EnvelopeOpen className="w-full h-full stroke-neutral" />
		{:else}
			<EnvelopeClose className="w-full h-full stroke-neutral" />
		{/if}
	</div>
</div>