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
			location.reload();
		}
	}
</script>

<nav>
	<div class="wrap">
		<div class="iwrap">
			<div class="logo">
				<a href="/"><img src="./logo.svg" alt="ConfessIt Logo" /></a>
			</div>
			<div class="github">
				<a href="https://github.com/mystique09" rel="noopener" target="_blank">
					<img src="./icons8-github.svg" alt="My github icon" />
				</a>
			</div>
			{#if !$session}
				<a class="login_btn" href="/login">Login</a>
			{:else}
				<div class="menu_btn" on:click={() => (isOpen = !isOpen)}>
					<MenuIcon />
					<h4>Menu</h4>
				</div>
			{/if}
		</div>
		<div class="menu" class:hide={!isOpen}>
			<ul>
				<li><a href="/dashboard">Dashboard</a></li>
				<li><a href="/dashboard/profile">My Account</a></li>
				<li><button on:click={signOut} type="button">Sign out</button></li>
			</ul>
		</div>
	</div>
</nav>

<style lang="postcss">
	nav {
		@apply max-w-4xl m-auto flex items-center;
	}
	.wrap {
		@apply px-4 py-2 w-screen flex flex-col items-start justify-between gap-1;
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
		@apply px-4 py-2 bg-gray-100 w-full;
	}
	.menu li {
		@apply text-accent font-normal text-lg;
	}
	.iwrap {
		@apply flex flex-row gap-4 items-center justify-between w-full;
	}
	.github {
		@apply h-16 w-16;
	}
	.github a img {
		@apply w-full h-full;
	}
</style>
