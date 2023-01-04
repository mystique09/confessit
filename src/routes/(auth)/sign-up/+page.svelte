<script lang="ts">
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import EyeClose from '$lib/components/icons/eye_close.svelte';
	import EyeOpen from '$lib/components/icons/eye_open.svelte';
	import Key from '$lib/components/icons/key.svelte';
	import UserAvatar from '$lib/components/icons/user_avatar.svelte';
	import type { ActionData } from './$types';
	import { slide } from 'svelte/transition';
	import Check from '$lib/components/icons/check.svelte';

	let showPassword: boolean = false;
	let submitForm: boolean = false;

	function togglePassword() {
		showPassword = !showPassword;
	}

	function submitFormHandler() {
		submitForm = true;
	}

	export let form: ActionData;

	$: if (form?.success) {
		if (browser) {
			goto('/sign-in').then(() => {
				window.location.reload();
			});
		}
	}

	$: if (
		form?.signUpFailed ||
		form?.invalidPasswordLength ||
		form?.invalidUsernameLength ||
		form?.passwordsDoNotMatch ||
		form?.missingCredentials ||
		form?.missingRecaptchaToken ||
		form?.invalidRecaptchaToken
	) {
		submitForm = false;
	}

	$: token = '';

	const onSubmitCaptcha = () => {
		grecaptcha.ready(function () {
			grecaptcha
				.execute('6LdBec4jAAAAAFDaErCHEhir_-q3bK5ytmRxb5FZ', { action: 'button' })
				.then(function (t: string) {
					// Add your logic to submit to your backend server here.
					console.log(t);
					token = t;
				});
		});
	};
</script>

<svelte:head>
	<title>CNFS - Sign up</title>
	<meta name="description" content="Join CNFS now!" />
	<script
		src="https://www.google.com/recaptcha/api.js?render=6LdBec4jAAAAAFDaErCHEhir_-q3bK5ytmRxb5FZ"
	></script></svelte:head
>

<div class="min-h-screen px-4">
	<div class="h-full container mt-12 max-w-2xl m-auto bg-[#EEEEEE] px-4 py-6 rounded-md">
		<h1 class="font-normal text-base text-neutral text-center">Let's create your account</h1>
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
		{#if form?.signUpFailed || form?.invalidPasswordLength || form?.invalidUsernameLength || form?.passwordsDoNotMatch || form?.missingCredentials || form?.invalidRecaptchaToken || form?.missingRecaptchaToken}
			<div
				in:slide={{ delay: 300 }}
				tabindex="-1"
				class="collapse w-full md:w-3/4 m-auto collapse-open"
			>
				<div class="collapse-title text-error text-sm">Signup Error</div>
				<div class="collapse-content text-xs">
					<p class="text-error">{form?.message}</p>
				</div>
			</div>
		{/if}
		<form class="form-control w-full md:w-3/4 m-auto" method="POST" action="?/signUp" use:enhance>
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
					{#if showPassword}
						<EyeClose className="w-6 h-6 stroke-neutral" />
					{:else}
						<EyeOpen className="w-6 h-6 stroke-neutral" />
					{/if}
				</button>
				<input
					class="input input-bordered  w-full bg-white text-neutral"
					type={showPassword ? 'text' : 'password'}
					name="password"
					id="password"
				/>
			</div>
			<label for="confirm-password">
				<span class="label-text text-neutral">Confirm password</span>
			</label>
			<div class="input-group">
				<span class="bg-white"><Key className="w-6 h-6 stroke-neutral" /></span>
				<input
					class="input input-bordered  w-full bg-white text-neutral"
					type="password"
					name="confirm-password"
					id="confirm-password"
				/>
			</div>
			<input type="hidden" id="token" name="token" bind:value={token} />
			<div class="flex-col items-start w-full gap-4 md:flex-row mt-2">
				{#if form?.missingRecaptchaToken}
					<button
						type="button"
						id="g-recaptcha"
						name="g-recaptcha"
						aria-required="true"
						on:click={onSubmitCaptcha}
						class="g-recaptcha btn btn-ghost text-error text-xs font-light normal-case"
					>
						<Check className="w-8 h-8 stroke-error" /> human verification
					</button>
				{:else}
					<button
						type="button"
						id="g-recaptcha"
						name="g-recaptcha"
						aria-required="true"
						on:click={onSubmitCaptcha}
						class="g-recaptcha btn btn-ghost text-neutral text-xs font-light normal-case"
					>
						<Check className="w-8 h-8 stroke-success" /> human verification
					</button>
				{/if}
				<div class="flex flex-col md:flex-row-reverse items-center gap-2 m-auto w-full mt-4">
					<button
						on:click={submitFormHandler}
						class:loading={submitForm}
						class:btn-disabled={submitForm}
						class:text-neutral={submitForm}
						class="btn btn-error rounded-md w-full md:w-1/2 normal-case">Create your account</button
					>
					<a class="btn btn-ghost w-full text-neutral md:w-1/2 normal-case" href="/sign-in"
						>Log in</a
					>
				</div>
			</div>
		</form>
	</div>
</div>