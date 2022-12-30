<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import toggleMenu, { toggle } from '$lib/store/menu';
	import { fly } from 'svelte/transition';
	import Close from '../icons/close.svelte';

	export let isAuthenticated: boolean = false;

	type navLink = {
		name: string;
		href: string;
	};

	let navLinks: navLink[] = [
		{
			name: 'Wall',
			href: '/wall'
		},
		{
			name: 'FAQ',
			href: '/#faq'
		},
		{
			name: 'Privacy and Policy',
			href: '/#privacy-policy'
		}
	];

	const signoutHandler = async () => {
		try {
			const req = await fetch('/logout', {
				method: 'POST'
			});
			const data = await req.json();
			console.log(data);
			await invalidateAll();
		} catch (e) {
			console.log(e);
		}
		$toggleMenu = false;
	};
</script>

<div
	in:fly={{ duration: 500, x: 500 }}
	out:fly={{ duration: 200, x: 500 }}
	class="sidebar fixed top-0 left-0 bg-neutral w-screen h-screen z-10 md:hidden"
>
	<div class="wrap flex flex-col justify-around gap-1 h-full p-4">
		<button class="btn btn-square btn-ghost flex-0 self-end" on:click={toggle}>
			<Close className="stroke-white w-6 h-6" />
		</button>
		<ul
			class="w-full h-auto flex flex-col items-center justify-evenly max-h-[450px] my-auto gap-4 flex-1"
		>
			{#each navLinks as navLink}
				<li
					on:click={toggle}
					on:keydown={toggle}
					class="btn btn-wide btn-md rounded-full font-light normal-case"
				>
					<a class="w-full" href={navLink.href}>{navLink.name}</a>
				</li>
			{/each}
			{#if isAuthenticated}
				<li
					on:click={toggle}
					on:keydown={toggle}
					class="btn btn-wide btn-md rounded-full font-light normal-case"
				>
					<a class="w-full" href="/dashboard">Dashboard</a>
				</li>
				<li>
					<button
						on:click={signoutHandler}
						type="button"
						class="normal-case btn btn-wide btn-accent">Sign out</button
					>
				</li>
			{/if}
		</ul>
	</div>
</div>