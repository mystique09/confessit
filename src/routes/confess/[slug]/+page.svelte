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
		<textarea id="message" name="message" cols="30" rows="10" required placeholder="Hello, ..." />
		{#if form?.success && form?.message != null}
			<span class="success">{form?.message}</span>
		{:else if !form?.success && form?.confess != null}
			<span class="error">{form?.message}</span>
		{/if}
		<div class="btns">
			<button id="submit" type="submit">Submit</button>
		</div>
	</form>
</main>

<style lang="postcss">
	h1 {
		@apply font-semibold text-3xl my-4;
	}

	main {
		@apply py-6 px-4 bg-gray-100 h-screen;
	}

	form {
		@apply mt-5 max-w-md md:m-auto;
	}
	.btns {
		@apply flex flex-row w-full items-center justify-end;
	}
	#submit {
		@apply mt-2 text-white font-semibold rounded-md bg-secondary px-12 py-3;
	}
	textarea {
		@apply border-none w-full bg-gray-300 text-gray-700 p-4;
	}
	span {
		@apply font-normal text-accent;
	}
	span.error {
		@apply text-red-600 text-xs;
	}
	span.success {
		@apply text-green-600 text-xs;
	}
</style>
