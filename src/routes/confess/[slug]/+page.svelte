<script lang="ts">
	import { page } from '$app/stores';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<svelte:head>
	<title>ConfessIt - {$page.data.slug}</title>
</svelte:head>

<main>
	<form method="POST" action="?/send">
		<h1>Send your message to <span>{$page.data.slug}</span></h1>
		<textarea
			id="message"
			name="message"
			cols="30"
			rows="10"
			required
			placeholder="Your message here"
		/>
		{#if form?.success && form?.message != null}
			<p class="success">{form?.message}</p>
		{:else if !form?.success && form?.confess != null}
			<p class="error">{form?.message}</p>
		{/if}
		<div class="btns">
			<button id="submit" type="submit">Submit</button>
		</div>
	</form>
</main>

<style lang="postcss">
	h1 {
		@apply font-normal text-lg my-4;
	}

	main {
		@apply py-6 px-4 h-screen;
	}

	form {
		@apply mt-5 max-w-md md:m-auto;
	}

	.btns {
		@apply flex flex-row w-full items-center justify-end;
	}

	#submit {
		@apply px-6 py-3 w-full;
		@apply bg-secondary text-white text-xs rounded-md;
	}

	textarea {
		@apply w-full py-4 px-2 text-sm;
		@apply border-none outline-none;
		@apply text-accent;
		@apply ring ring-secondary rounded-sm resize-none text-accent;
	}

	span {
		@apply text-secondary;
	}
</style>
