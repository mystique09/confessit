<script lang="ts">
	import { session } from '$app/stores';
	import MenuIcon from './menu_icon.svelte';

	let isOpen = false;

	async function signOut() {
		const response = await fetch('/api/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();

		if (data) {
			location.replace('/login');
		}
	}
</script>

<nav>
	<div class="wrap">
		<div class="logo">
			<a href="/"><img src="/logo.svg" alt="ConfessIt Logo" /></a>
		</div>
		{#if !$session}
			<a class="login_btn" href="/login">Login</a>
		{:else}
			<div class="menu_btn" on:click={() => (isOpen = !isOpen)}>
				<MenuIcon />
				<h4>Menu</h4>
			</div>
			<div class="menu" class:hide={!isOpen}>
				<ul>
					<li><a href="/dashboard">Dashboard</a></li>
					<li><a href="/dashboard/profile">My Account</a></li>
					<li><button on:click={signOut} type="button">Sign out</button></li>
				</ul>
			</div>
		{/if}
	</div>
</nav>

<style lang="postcss">
	nav {
		@apply w-screen max-w-4xl m-auto flex items-center;
	}
	.wrap {
		@apply px-4 py-2 w-full flex flex-row items-center justify-between;
	}
	.logo {
		@apply w-full h-full;
	}
	.logo a img {
		@apply w-auto h-auto;
	}
	.login_btn {
		@apply bg-secondary px-8 py-2 text-white rounded-md font-semibold;
	}
	.menu_btn {
		@apply h-full bg-secondary cursor-pointer flex flex-row items-center justify-between gap-1 px-6 py-2 text-white rounded-md;
	}
	.menu_btn h4 {
		@apply font-bold text-lg;
	}
	.hide {
		@apply hidden;
	}
	.menu {
		@apply px-4 py-2 rounded-md absolute top-16 right-0 bg-gray-300 w-1/2;
	}
	.menu li {
		@apply text-accent font-normal text-lg;
	}
</style>
