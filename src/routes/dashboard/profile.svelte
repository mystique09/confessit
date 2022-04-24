<script context="module">
	export async function load({ session }) {
		if (!session) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {
			status: 200,
			props: { username: 'mystique09' }
		};
	}
</script>

<script lang="ts">
	export let username: string;

	let payload = '';
	let error = '';

	async function onSubmit() {
		if (payload.length < 8) {
			error = 'Password length should be 8 and above.';
			setTimeout(() => (error = ''), 2000);
			return;
		}
		console.log({ payload });
	}
</script>

<svelte:head>
	<title>ConfessIt - My Account</title>
</svelte:head>

<main>
	<a href="/dashboard">Dashboard</a>
	<form on:submit|preventDefault={onSubmit}>
		<h1>My Acccount</h1>
		<div class="input_group">
			<label for="username">Username</label>
			<input disabled type="text" value={username} />
		</div>
		<div class="input_group">
			<label for="password">Password</label>
			<input type="password" required placeholder="New password" bind:value={payload} />
		</div>
		<p class="error">{error}</p>
		<div class="btns">
			<button id="submit" type="submit">Submit</button>
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
	#submit {
		@apply mt-2 text-white font-semibold rounded-md bg-secondary px-12 py-3;
	}

	.error {
		@apply py-2 text-red-500 font-normal text-sm;
	}
	a {
		@apply underline text-accent font-normal;
	}
</style>
