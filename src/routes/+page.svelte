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
		<div class="top">
			<div class="heading flex items-center justify-center">
				<img src="/logo.svg" alt="ConfessIt Logo" />
			</div>
			<p>
				Confess your feelings to someone anonymously, no matter how weird or crazy, or even
				perverted they are. No one will ever know, except YOU and the receiver!
			</p>
		</div>
		<div class="divider" />
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
		<div class="btn">
			<button id="signup" type="submit">Sign up</button>
		</div>
	</form>
</main>

<style lang="postcss">
	main {
		@apply px-2 h-screen flex flex-col;
	}

	form {
		@apply bg-black/80 p-4 shadow-lg;
		@apply w-full max-w-md m-auto;
	}

	.heading {
		@apply my-4;
	}

	form > .top p {
		@apply text-xs font-light text-white;
	}

	.input_group {
		@apply m-auto mt-2;
	}

	label {
		@apply text-xs font-normal text-white;
	}

	input {
		@apply px-6 py-2;
		@apply text-xs;
		@apply max-w-md w-full;
		@apply outline-none rounded-md;
	}

	.btn {
		@apply flex flex-col items-end w-full mt-8;
	}

	#signup {
		@apply px-6 py-3 w-full;
		@apply bg-secondary text-white text-xs rounded-md;
	}
</style>
