<script context="module">
	export async function load({ params }) {
		let { slug } = params;
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

	async function onSubmit() {
		console.log(message);
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
</style>
