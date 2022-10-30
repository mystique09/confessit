<script lang="ts">
	import MenuIcon from './menu_icon.svelte';

	let isOpen = false;

	async function signOut() {
		await fetch('/dashboard', {
			method: 'POST'
		});
		invalidateAll();
	}

	const showNav = () => (isOpen = !isOpen);

	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
</script>

<nav>
	<div class="wrap">
		<div class="iwrap">
			<div class="logo">
				<a href="/"><img src="/logo.svg" alt="ConfessIt Logo" /></a>
			</div>
			{#if !$page.data?.authenticated}
				<a class="login_btn" href="/login">Login</a>
			{:else}
				<div
					class="menu_btn"
					on:click={() => (isOpen = !isOpen)}
					on:keydown={() => (isOpen = !isOpen)}
				>
					<MenuIcon />
				</div>
			{/if}
		</div>
	</div>
	<div class="menu" class:hide={!isOpen}>
		<ul>
			<li on:click={showNav} on:keydown={showNav}><a href="/dashboard">Dashboard</a></li>
			<li on:click={showNav} on:keydown={showNav}><a href="/dashboard/profile">My Account</a></li>
			<li on:click={showNav} on:keydown={showNav}>
				<button on:click={signOut} type="button">Sign out</button>
			</li>
		</ul>
	</div>
</nav>

<style lang="postcss">
	nav {
		@apply w-full flex flex-col items-center;
	}

	.wrap {
		@apply max-w-4xl m-auto px-4 py-2 w-full flex flex-col items-start justify-between gap-1;
	}

	.logo {
		@apply w-16 h-12;
	}

	.logo a img {
		@apply w-full h-full;
	}

	.login_btn {
		@apply bg-secondary/20;
		@apply ring ring-secondary rounded-sm border-none;
		@apply font-normal text-xs text-secondary;
		@apply px-8 py-2;
	}

	.menu_btn {
		@apply h-full cursor-pointer flex flex-row items-center justify-between gap-1 text-secondary;
	}

	.hide {
		@apply hidden;
	}

	.menu {
		@apply px-4 py-2 w-full shadow-lg;
	}

	.menu li {
		@apply text-black/80 font-normal text-lg;
	}

	.iwrap {
		@apply flex flex-row gap-4 items-center justify-between w-full;
	}
</style>
