<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Check from '$lib/components/icons/check.svelte';
	import EyeClose from '$lib/components/icons/eye_close.svelte';
	import EyeOpen from '$lib/components/icons/eye_open.svelte';
	import Info from '$lib/components/icons/info.svelte';
	import toggleMenu from '$lib/store/menu';
	import { slide } from 'svelte/transition';
	import type { ActionData } from './$types';

	let showPassword = false;
	let tempUsername = $page.data.user.username;
	let newUsername: string;

	$: isUsernameChangeable = (tempUsername !== newUsername) && newUsername?.length > 8;

	let isChangingUsername = false;
	let isChangingPassword = false;

	const usernameHandler = () => {
		isChangingUsername = true;
	};

	const passwordHandler = () => {
		isChangingPassword = true;
	};

	const togglePassword = () => {
		showPassword = !showPassword;
	};

	export let form: ActionData;

	$: if (form?.failedAccountUpdate || form?.updateSuccess || form?.updateSuccess) {
		isChangingUsername = false;
		isChangingPassword = false;
	}

	$: if(form?.updateSuccess) {
		setTimeout(() => {
			signoutHandler();
		}, 5000);
	}

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

<div class="w-full h-screen bg-base py-6 px-4 max-w-md">
	{#if form?.failedAccountUpdate}
		<div in:slide={{ delay: 300 }} class="text-sm alert alert-error alert-sm my-8 flex flex-row">
			<Info className="w-6 h-6 stroke-error-content" />
			{form?.message}
		</div>
	{/if}
	{#if form?.updateSuccess}
		<div class="modal modal-open">
			<div class="modal-box" in:slide={{ delay: 300 }}>
				<h3 class="font-bold text-lg">{form?.message}</h3>
				<p class="text-sm py-4">
					Session ended, you need to login again after updating your account.
					<br>
				</p>
				<p class="text-error">
					Session will auto end after 5 seconds.
				</p>
				<div class="modal-action">
					<button on:click={signoutHandler} type="button" class="btn btn-wide btn-success normal-case">Login</button>
				</div>
			</div>
		</div>
	{/if}
	<h1 class="text-white text-2xl md:text-4xl mb-8">Account Settings</h1>
	<form action="?/updateAccountUsername" class="mt-4 form-control w-full" method="POST" use:enhance>
		<h2 class="text-lg font-bold mb-2">General settings</h2>
		<label for="username">Username</label>
		<div class="input-group max-w-sm w-full">
			<input
				type="text"
				id="username"
				name="username"
				class="input input-sm input-bordered w-full"
				placeholder={tempUsername}
				bind:value={newUsername}
			/>
			<button
				on:click={usernameHandler}
				class="btn btn-sm rounded-full btn-neutral-content normal-case flex gap-2"
				class:loading={isChangingUsername}
				class:btn-disabled={!isUsernameChangeable || isChangingUsername}
			>
				{#if !isChangingUsername}
					<Check className="w-4" />
				{/if}
				Save
			</button>
		</div>
		<div class="divider max-w-sm" />
		<div class="w-28 mb-2">
			<h2
				class="text-lg font-bold tooltip tooltip-right flex flex-row items-center gap-2"
				data-tip="Dangerous action, please be careful."
			>
				Sensitive
				<Info className="w-4 h-4 stroke-warning" />
			</h2>
		</div>
		<label for="newPassword">New password</label>
		<div class="input-group max-w-sm w-full">
			<input
				type={showPassword ? 'text' : 'password'}
				id="newPassword"
				name="newPassword"
				class="input input-sm input-bordered w-full"
			/>
			<button on:click={togglePassword} type="button" class="btn btn-sm">
				{#if showPassword}
					<EyeClose />
				{:else}
					<EyeOpen />
				{/if}
			</button>
		</div>
		<label for="confirmPassword">Confirm password</label>
		<div class="input-group max-w-sm">
			<input
				type={showPassword ? 'text' : 'password'}
				id="confirmPassword"
				name="confirmPassword"
				class="input input-sm input-bordered w-full"
			/>
			<button
				on:click={passwordHandler}
				formaction="?/updateAccountPassword"
				class="btn btn-sm rounded-full btn-neutral-content normal-case flex gap-2"
				class:loading={isChangingPassword}
				class:btn-disabled={isChangingPassword}
			>
				{#if !isChangingPassword}
					<Check className="w-4" />
				{/if}
				Save
			</button>
		</div>
		<div class="max-w-xs mt-2 flex flex-row items-center" />
	</form>
</div>
