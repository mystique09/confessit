<script context="module">
	export async function load({ session }) {
		if (session) {
			return {
				status: 302,
				redirect: '/dashboard'
			};
		}
		return { props: {} };
	}
</script>

<script lang="ts">
	let loginError = '';
	const payload = {
		username: '',
		password: ''
	};

	async function submitForm() {
		if (payload.username.length < 8) {
			loginError = 'Username length must be above 8.';
			setTimeout(() => (loginError = ''), 2000);
			return;
		}

		const response = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		});

		const { status, message } = await response.json();

		if (status !== 'error') {
			loginError = message;
			return;
		}

		location.replace('/login');
		return;
	}
</script>

<svelte:head>
	<title>ConfessIt - Get Started</title>
</svelte:head>

<main>
	<form on:submit|preventDefault={submitForm}>
		<h1 class="heading">Create an account to get started.</h1>
		<h2>
			Confess your feelings to someone anonymously, no matter how weird or crazy, or even perverted
			they are. No one will ever know, except YOU and the receiver!
		</h2>
		<div class="input_group">
			<label for="username">Username</label>
			<input type="text" bind:value={payload.username} required placeholder="mystique09" />
		</div>
		<div class="input_group">
			<label for="password">Password</label>
			<input type="password" bind:value={payload.password} required />
		</div>
		<p class="error">{loginError}</p>
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
</style>
