<script lang="ts">
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData } from './$types';

	export let form: ActionData;

	if (browser) {
		invalidateAll();
	}
</script>

<svelte:head>
	<title>ConfessIt - Get Started</title>
</svelte:head>

<main>
	<form method="POST" action="?/signup">
		<h1 class="heading">Create an account to get started.</h1>
		<h2>
			Confess your feelings to someone anonymously, no matter how weird or crazy, or even perverted
			they are. No one will ever know, except YOU and the receiver!
		</h2>
		<div class="input_group">
			<label class:error={form?.credentials || form?.username} for="username">Username</label>
			<input name="username" id="username" type="text" required placeholder="mystique09" />
		</div>
		<div class="input_group">
			<label class:error={form?.credentials || form?.password} for="password">Password</label>
			<input name="password" id="password" type="password" required />
		</div>
		{#if !form?.success && form?.message != null}
			<p class="error">{form?.message}</p>
		{/if}
		{#if form?.success && form?.message != null}
			<p class="success">{form?.message}</p>
		{/if}
		<div class="btns">
			<button id="login" type="submit">Create Account</button>
		</div>
	</form>
</main>

<style lang="postcss">
	h1 {
		@apply font-semibold text-4xl mb-4;
	}

	main {
		@apply pt-4 px-2 bg-gray-100 h-screen;
	}

	form {
		@apply mt-5 max-w-md md:m-auto;
	}

	form h2 {
		@apply font-light text-lg text-secondary;
	}

	.input_group {
		@apply flex flex-col gap-1 items-start mt-2;
	}
	label {
		@apply text-xs text-gray-600 font-normal;
	}
	input {
		@apply outline-none rounded-md px-8 w-full text-sm max-w-md py-3 text-gray-600;
	}

	.btns {
		@apply flex flex-row w-full items-center justify-end;
	}
	#login {
		@apply mt-2 text-white font-semibold rounded-md bg-secondary px-12 py-3;
	}

	.error {
		@apply py-2 text-red-500 font-normal text-sm;
	}

	.success {
		@apply py-2 text-green-500 font-normal text-sm;
	}
</style>
