<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import EyeClose from '$lib/components/icons/eye_close.svelte';
	import EyeOpen from '$lib/components/icons/eye_open.svelte';
	import UserAvatar from '$lib/components/icons/user_avatar.svelte';
	import Show from '$lib/components/shared/show.svelte';
	import { slide } from 'svelte/transition';
	import type { ActionData } from './$types';

	let { form } = $props<{ form: ActionData }>();

	let showPassword = $state(false);
	let submitForm = $state(false);

	let invalidInputs: boolean = $state(
		form?.invalidUsernameLength ||
			form?.invalidPasswordLength ||
			form?.loginFailed ||
			form?.missingCredentials
	);
	let successfullSubmission = $state(form?.success);

	function togglePassword() {
		showPassword = !showPassword;
	}

	function submitFormHandler() {
		submitForm = true;
	}

	$effect(() => {
		if (successfullSubmission) {
			invalidateAll();
		}

		if (invalidInputs) {
			submitForm = false;
		}
	});
</script>

<svelte:head>
	<title>CNFS - Sign in</title>
	<meta name="description" content="Welcome back!" />
</svelte:head>

<div class="min-h-screen px-4">
	<div class="h-full container mt-12 max-w-2xl m-auto bg-[#EEEEEE] px-4 py-6 rounded-md">
		<h1 class="font-normal text-base text-neutral text-center">Welcome back!</h1>
		<div class="oauth flex flex-col items-center gap-4 w-full mt-12">
			<div class="badge badge-warning">0Auth is not yet supported.</div>
			<div
				class="btn btn-disabled w-full md:w-3/4 rounded bg-white btn-md outline-none border-none text-neutral hover:text-white normal-case"
			>
				Google
			</div>
			<div class="btn btn-disabled w-full md:w-3/4 rounded btn-md text-white normal-case">
				Github
			</div>
		</div>
		<div class="divider w-3/4 m-auto my-4 text-neutral">or</div>
		<Show when={invalidInputs}>
			<div
				in:slide|global={{ delay: 300 }}
				tabindex="-1"
				class="collapse w-full md:w-3/4 m-auto collapse-open"
			>
				<div class="collapse-title text-error text-sm">Login Error</div>
				<div class="collapse-content text-xs">
					<p class="text-error">{form?.message}</p>
				</div>
			</div>
		</Show>
		<form class="form-control w-full md:w-3/4 m-auto" method="POST" action="?/signIn" use:enhance>
			<label for="username">
				<span class="label-text text-neutral">Username</span>
			</label>
			<div class="input-group">
				<span class="bg-white"><UserAvatar className="w-6 h-6 stroke-neutral" /></span>
				<input
					class="input input-bordered w-full bg-white text-neutral"
					type="text"
					name="username"
					id="username"
				/>
			</div>
			<label for="password">
				<span class="label-text text-neutral">Password</span>
			</label>
			<div class="input-group">
				<button class="btn bg-white btn-ghost" type="button" on:click={togglePassword}>
					<Show when={showPassword}>
						<EyeClose className="w-6 h-6 stroke-neutral" />

						{#snippet fallback()}
							<EyeOpen className="w-6 h-6 stroke-neutral" />
						{/snippet}
					</Show>
				</button>
				<input
					class="input input-bordered w-full bg-white text-neutral"
					type={showPassword ? 'text' : 'password'}
					name="password"
					id="password"
				/>
			</div>
			<div class="flex flex-col md:flex-row-reverse items-center gap-2 m-auto w-full mt-4">
				<button
					on:click={submitFormHandler}
					class:loading={submitForm}
					class:btn-disabled={submitForm}
					class:text-neutral={submitForm}
					class="btn btn-error rounded-md w-full md:w-1/2 normal-case">Log in</button
				>
				<a class="btn btn-ghost w-full text-neutral md:w-1/2 normal-case" href="/sign-up"
					>Create your account</a
				>
			</div>
		</form>
	</div>
</div>
