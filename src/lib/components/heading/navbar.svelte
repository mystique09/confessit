<script lang="ts">
	import MenuIcon from './menu_icon.svelte';
	import toggleMenu, { toggle } from '$lib/store/menu';
	import { invalidateAll } from '$app/navigation';
	import ArrowLeft from '../icons/arrow_left.svelte';
	export let isAuthenticated: boolean = false;

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

<div class="navbar h-full px-4 max-w-6xl m-auto">
	<div class="w-auto flex-0">
		<div>
			<a href="/">
				<img width="120px" height="120px" src="/favicon.png" alt="CNFS logo" />
			</a>
		</div>
	</div>
	{#if !isAuthenticated}
		<div class="navbar-center flex-1 items-center justify-center">
			<ul class="hidden md:flex md:flex-row justify-evenly w-1/2 font-bold text-white">
				<li><a href="/wall">Public Wall</a></li>
				<li><a href="/#whatiscnfs">What's CNFS</a></li>
				<li><a href="/#guidelines">Guidelines</a></li>
				<li><a href="/#faq">FAQ</a></li>
			</ul>
		</div>
		<div class="hidden md:flex md:flex-0">
			<a
				class="btn btn-error px-10 h-14 text-sm normal-case rounded-full font-bold hover:bg-transparent hover:text-error"
				href="/sign-up">JOIN CNFS</a
			>
		</div>
	{:else}
		<div class="navbar-end hidden md:flex md:flex-1">
			<ul class="hidden md:flex md:flex-row justify-evenly w-1/2 font-bold text-white">
				<li><a href="/wall">Public Wall</a></li>
				<li><a href="/#whatiscnfs">What's CNFS</a></li>
				<li><a href="/#guidelines">Guidelines</a></li>
				<li><a href="/#faq">FAQ</a></li>
			</ul>
			<div class="dropdown dropdown-end rounded-btn">
				<label tabindex="-1" for="" class="btn btn-ghost btn-circle w-14 h-14">
					<div class="avatar">
						<div class="w-full rounded-full">
							<img src="https://placeimg.com/192/192/people" alt="random people" />
						</div>
					</div>
				</label>
				<ul class="menu gap-2 dropdown-content p-2 shadow bg-base-200 w-56">
					<li><a href="/dashboard">Messages</a></li>
					<li><a href="/dashboard/settings/account">Account</a></li>
					<li><a href="/dashboard/settings">Settings</a></li>
					<li class="mt-8">
						<button on:click={signoutHandler} type="button" class="normal-case btn btn-accent">
							<ArrowLeft /> Sign out
						</button>
					</li>
				</ul>
			</div>
		</div>
	{/if}
	<div class="navbar-end md:hidden flex-1">
		<button class="btn btn-square btn-ghost" on:click={toggle}>
			<MenuIcon />
		</button>
	</div>
</div>
