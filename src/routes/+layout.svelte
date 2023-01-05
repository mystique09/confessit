<script lang="ts">
	import Navbar from '$lib/components/heading/navbar.svelte';
	import '../app.css';
	import '@fontsource/poppins';
	import BackToTop from '$lib/components/back_to_top.svelte';
	import toggleMenu from '$lib/store/menu';
	import Menu from '$lib/components/heading/menu.svelte';
	import { fade } from 'svelte/transition';
	import { navigating, page } from '$app/stores';
	import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';

	let yPos: number = 0;
	let width: number = 0;

	$: if (width > 760) {
		$toggleMenu = false;
	}

	let showLoadingScreen = false;

	$: {
		if ($navigating) {
			showLoadingScreen = true;
		}

		if (!$navigating) {
			showLoadingScreen = false;
		}
	}
</script>

{#if $page.data.serverStatus === 'offline'}
	<div class="fixed z-10 badge badge-xl badge-warning w-full text-lg">
		😦 Server is {$page.data.serverStatus}
	</div>
{/if}

<Navbar isAuthenticated={$page.data.authenticated} />

{#if showLoadingScreen}
	<div class="fixed z-30 top-0 left-0 w-screen h-screen bg-neutral">
		<div class="container container-md h-full m-auto flex flex-col items-center justify-center">
			<span class="text-lg">Loading data</span>
			<progress class="mt-2 progress progress-primary w-56" />
		</div>
	</div>
{:else if !$toggleMenu}
	<div in:fade={{ duration: 100, delay: 200 }}>
		<slot />
	</div>
{:else}
	<Menu isAuthenticated={$page.data.authenticated} />
{/if}

<svelte:window bind:scrollY={yPos} bind:innerWidth={width} />

<svelte:head>
	<script
		src={`https://www.google.com/recaptcha/api.js?render=${PUBLIC_RECAPTCHA_KEY}`}
	></script></svelte:head
>

{#if !$page.url.pathname.startsWith('/wall')}
	{#if yPos > 1000}
		<BackToTop />
	{/if}
{/if}
