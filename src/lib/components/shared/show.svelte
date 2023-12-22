<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		when: boolean;
		children: Snippet;
		fallback?: Snippet;
	};

	let { when: condition, children, fallback} = $props<Props>();
</script>

{#if condition}
	{#if children}
    	{@render children()}
	{/if}
{:else}
	{#if fallback}
		{@render fallback()}
	{/if}
{/if}