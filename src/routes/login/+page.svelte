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
	<title>ConfessIt - Login</title>
</svelte:head>

<main>
	<form id="login" method="POST" action="?/login">
		<div class="top">
			<div class="heading flex items-center justify-center">
				<img src="/logo.svg" alt="ConfessIt Logo" />
			</div>
		</div>
		<div class="divider" />
		<div class="input_group">
			<label class:error={form?.credentials || form?.username} for="username">Username</label>
			<input required type="text" name="username" id="username" placeholder="Username" />
		</div>
		<div class="input_group">
			<label class:error={form?.credentials || form?.password} for="password">Password</label>
			<input required type="password" name="password" id="password" placeholder="Password" />
		</div>
		{#if !form?.success && form?.message != null}
			<p class="error">
				{form?.message}
			</p>
		{/if}
		{#if form?.success && form?.message != null}
			<p class="success">{form?.message}</p>
		{/if}
		<div class="btn">
			<button id="login_btn" type="submit">Sign in</button>
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

	.top .heading {
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

	#login_btn {
		@apply px-6 py-3 w-full;
		@apply bg-secondary text-white text-xs rounded-md;
	}
</style>
