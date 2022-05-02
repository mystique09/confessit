<script context="module">
	export async function load({ params, fetch }) {
		const { slug } = params;

		const response = await fetch(`/api/me/${slug}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			}
		});

		const data = await response.json();

		if (data.status === 'error') {
			return {
				status: 404,
				props: {
					slug: 'Not found'
				}
			};
		}

		return {
			status: 200,
			props: {
				slug
			}
		};
	}
</script>

<script lang="ts">
	export let slug: string;

	let message = '';
	let error = '';
	let success = false;

	async function onSubmit() {
		const payload = {
			to: slug,
			message
		};

		const response = await fetch(`/api/me/${slug}`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'content-type': 'application/json',
				accept: 'application/json'
			}
		});

		const data = await response.json();
		if (data.status === error) {
			error = data.message;
			setTimeout(() => (error = ''), 2500);
			return;
		}
		success = true;
		setTimeout(() => location.reload(), 500);
	}
</script>

<svelte:head>
	<title>ConfessIt - {slug}</title>
</svelte:head>

<main>
	<form on:submit|preventDefault={onSubmit}>
		<h1>Send your message to <span>{slug}</span></h1>
		<textarea
			bind:value={message}
			name="message"
			id="message"
			cols="30"
			rows="10"
			required
			placeholder="Hello, ..."
		/>
		{#if success}
			<span class="success">{'Message sent.'}</span>
		{:else}
			<span class="error">{error}</span>
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
		@apply text-red-600;	
	}
	span.success {
		@apply text-green-600;
	}
</style>
