<script lang="ts">
	import MenuIcon from "./menu_icon.svelte";
	import {toggle} from "$lib/store/menu";
</script>

<div class="navbar px-4 max-w-6xl m-auto">
	<div class="w-auto flex-0">
		<div>
			<a href="/">
				<img width="120px" height="120px" src="/favicon.png" alt="CNFS logo" />
			</a>
		</div>
	</div>
	<div class="navbar-center flex-1 items-center justify-center">
		<ul class="hidden md:flex md:flex-row justify-around w-1/2 font-bold text-white">
			<li><a href="/wall">Wall</a></li>
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
	<div class="navbar-end md:hidden">
		<button class="btn btn-square btn-ghost" on:click={toggle}>
			<MenuIcon />
		</button>
	</div>
</div>