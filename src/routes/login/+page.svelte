<script lang="ts">
	import { page } from "$app/stores";


	// let loginError = '';
	// let payload = {
	// 	username: '',
	// 	password: ''
	// };

	// async function handleLogin() {
	// 	const response = await fetch('/api/auth', {
	// 		method: 'POST',
	// 		body: JSON.stringify(payload),
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Accept: 'application/json'
	// 		}
	// 	});

	// 	const { status, message } = await response.json();

	// 	if (status === 'success') {
	// 		location.replace('/dashboard');
	// 		return;
	// 	}

	// 	loginError = /Key/.test(message) ? 'Invalid username or password' : message;
	// 	setTimeout(() => (loginError = ''), 2500);
	// 	return;
	// }
</script>

<svelte:head>
	<title>ConfessIt - Login</title>
</svelte:head>

<main>
	<form id="login" method="POST">
		<h2>Login to continue</h2>
		<div class="input_group">
			<label for="username">Username</label>
			<input required type="text" name="username" id="username" />
		</div>
		<div class="input_group">
			<label for="password">Password</label>
			<input required type="password" name="password" id="password" />
		</div>
		<p class="error">{$page.form?.error}</p>
		<div class="btn">
			<button id="login_btn" type="submit">Login</button>
		</div>
	</form>
</main>

<style lang="postcss">
	main {
		@apply px-2 bg-gray-100 h-screen flex flex-col;
	}

	form {
		@apply flex flex-col justify-center max-w-md md:m-auto h-full;
	}
	form h2 {
		@apply font-semibold text-4xl;
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
	.btn {
		@apply flex flex-col items-end p-4;
	}
	#login_btn {
		@apply px-12 rounded-md py-3 bg-accent text-white font-semibold text-base;
	}

	.error {
		@apply font-normal text-sm text-red-500 py-2;
	}
</style>
