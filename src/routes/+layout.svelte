<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { PUBLIC_RECAPTCHA_KEY } from '$env/static/public';
	import BackToTop from '$lib/components/layout/back_to_top.svelte';
	import Menu from '$lib/components/layout/menu.svelte';
	import Navbar from '$lib/components/layout/navbar.svelte';
	import Show from '$lib/components/shared/show.svelte';
	import toggleMenu from '$lib/store/menu';
	import '@fontsource/poppins';
	import { setContext, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';

	let { children } = $props<{children: Snippet}>();

	let yPos: number = $state(0);
	let width: number = $state(0);
	let showLoadingScreen = $state(false);

	$effect(() => {
		if (width > 760) {
			$toggleMenu = false;
		}
	});

	$effect(() => {
		if ($navigating) {
			showLoadingScreen = true;
		}

		if (!$navigating) {
			showLoadingScreen = false;
		}
	});

	setContext('userAuth', { isAuthenticated: $page.data.isAuthenticated ?? false });
</script>

<svelte:window bind:scrollY={yPos} bind:innerWidth={width} />
<svelte:head>
	<script
		src={`https://www.google.com/recaptcha/api.js?render=${PUBLIC_RECAPTCHA_KEY}`}
	></script></svelte:head
>

<Show when={$page.data.serverStatus === 'offline'}>
	<div class="fixed z-10 badge badge-xl badge-warning w-full text-lg">
		😦 Server is {$page.data.serverStatus}
	</div>
</Show>

<Navbar />

<Show when={showLoadingScreen}>
	<div class="fixed z-30 top-0 left-0 w-screen h-screen bg-neutral">
		<div class="container container-md h-full m-auto flex flex-col items-center justify-center">
			<span class="text-lg">Loading data</span>
			<progress class="mt-2 progress progress-primary w-56" />
		</div>
	</div>

	{#snippet fallback()}
		<Show when={$toggleMenu}>
			<Menu />

			{#snippet fallback()}
				<div in:fade|global={{ duration: 100, delay: 200 }}>
					{@render children()}
				</div>
			{/snippet}
		</Show>
	{/snippet}
</Show>

<Show when={!$page.url.pathname.startsWith('/wall') && yPos > 1000}>
	<BackToTop />
</Show>
