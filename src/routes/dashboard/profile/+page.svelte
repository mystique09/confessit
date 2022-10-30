<script lang="ts">
	import { page } from '$app/stores';

	let payload = '';
	let error = '';
</script>

<svelte:head>
	<title>ConfessIt - My Account</title>
</svelte:head>

<main>
	<form method="POST" action="?/changePassword">
		<div class="top">
			<div class="heading">
				<h1 class="text-xl my-2">Account info</h1>
			</div>
		</div>
		<div class="input_group">
			<label for="user_id">Account Id</label>
			<input
				name="user_id"
				id="user_id"
				class="text-white"
				disabled
				type="text"
				value={$page.data.profile.id}
			/>
		</div>
		<div class="input_group">
			<label for="username">Username</label>
			<input
				name="username"
				id="username"
				class="text-white"
				disabled
				type="text"
				value={$page.data.profile.username}
			/>
		</div>
		<div class="input_group">
			<label for="link">Share Profile link</label>
			<input
				name="link"
				id="link"
				class="text-white"
				disabled
				type="text"
				value={`${$page.url.origin}/confess/${$page.data.profile.username}`}
			/>
		</div>
		<div class="divider" />
		<div class="input_group">
			<label for="password">Password</label>
			<input type="password" required placeholder="New password" bind:value={payload} />
		</div>
		<p class="error">{error}</p>
		<div class="btn">
			<button id="submit" type="submit">Change password</button>
		</div>
	</form>
</main>

<style lang="postcss">
	main {
		@apply pt-4 px-2 h-full;
	}

	form {
		@apply p-4 shadow-lg;
		@apply w-full max-w-md m-auto;
	}

	.top .heading {
		@apply my-4;
		@apply flex items-center justify-center;
	}

	.input_group {
		@apply m-auto mt-2;
	}

	label {
		@apply text-xs font-normal text-black;
	}

	input {
		@apply px-6 py-2;
		@apply text-xs text-black;
		@apply max-w-md w-full;
		@apply outline-none rounded-md;
	}

	.btn {
		@apply flex flex-col items-end w-full;
	}

	#submit {
		@apply px-6 py-3 w-full;
		@apply bg-secondary text-white text-xs rounded-md;
	}
</style>
