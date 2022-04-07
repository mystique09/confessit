<script lang="ts">
	let error = '';
	const payload = {
		username: '',
		password: ''
	};

	const submitForm = () => {
		if (payload.username.length < 8) {
			error = 'Username length must be above 8.';
			setTimeout(() => (error = ''), 1000);
			return;
		}
	};
</script>

<div class="main">
	<div class="wrap">
		<h1 class="heading">Receive message from your secret admirers!</h1>
		<form on:submit|preventDefault={submitForm}>
			<h2>Join us, stranger.</h2>
			<div class="input_group">
				<label for="username">Username</label>
				<input type="text" bind:value={payload.username} required />
			</div>
			<div class="input_group">
				<label for="password">Password</label>
				<input type="password" bind:value={payload.password} required />
			</div>
			<p class="error">{error}</p>
			<div class="btns">
				<button id="submit" type="submit">Create Account</button>
			</div>
		</form>
	</div>
</div>

<style lang="postcss">
	h1 {
		@apply mt-10 font-semibold text-4xl my-4;
	}

	.main {
		@apply px-2 bg-gray-100 h-screen;
	}
	.wrap {
		@apply flex flex-col gap-4;
	}

	form {
		@apply mt-5 max-w-md md:m-auto;
	}
	form h2 {
		@apply font-semibold text-lg text-secondary;
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
		@apply mt-2 text-primary font-semibold rounded-md bg-accent px-12 py-3;
	}

	.error {
		@apply py-2 text-center text-red-400 font-semibold text-sm;
	}
</style>
