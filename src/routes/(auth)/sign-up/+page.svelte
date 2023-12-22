<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Check from '$lib/components/icons/check.svelte';
	import EyeClose from '$lib/components/icons/eye_close.svelte';
	import EyeOpen from '$lib/components/icons/eye_open.svelte';
	import Key from '$lib/components/icons/key.svelte';
	import UserAvatar from '$lib/components/icons/user_avatar.svelte';
	import Show from '$lib/components/shared/show.svelte';
	import { slide } from 'svelte/transition';
	import type { ActionData } from './$types';

	let { form } = $props<{ form: ActionData }>();

	let showPassword = $state(false);
	let submitForm = $state(false);

	let invalidInputs: boolean = $state(
		form?.signUpFailed ||
			form?.invalidPasswordLength ||
			form?.invalidUsernameLength ||
			form?.passwordsDoNotMatch ||
			form?.missingCredentials ||
			form?.missingRecaptchaToken ||
			form?.invalidRecaptchaToken
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
			goto('/sign-in').then(() => {
				window.location.reload();
			});
		}

		if (invalidInputs) {
			submitForm = false;
		}
	});

	let token = $state('');
	let isLoadingToken = $state(false);

	const onSubmitCaptcha = () => {
		isLoadingToken = true;
		grecaptcha.ready(function () {
			grecaptcha
				.execute('6LdBec4jAAAAAFDaErCHEhir_-q3bK5ytmRxb5FZ', { action: 'button' })
				.then(function (t: string) {
					// Add your logic to submit to your backend server here.
					token = t;
					isLoadingToken = false;
				});
		});
	};

	let tokenAcquired = $derived(!!token);
	$inspect(`[INFO] recaptcha token acquired ${!!tokenAcquired}`);
</script>

<svelte:head>
	<title>CNFS - Sign up</title>
	<meta name="description" content="Join CNFS now!" />
</svelte:head>

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
		<Show when={invalidInputs}>
			<div
				in:slide|global={{ delay: 300 }}
				tabindex="-1"
				class="collapse w-full md:w-3/4 m-auto collapse-open"
			>
				<div class="collapse-title text-error text-sm">Signup Error</div>
				<div class="collapse-content text-xs">
					<p class="text-error">{form?.message}</p>
				</div>
			</div>
		</Show>

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
					<Show when={showPassword}>
						<EyeClose className="w-6 h-6 stroke-neutral" />
					</Show>
					<Show when={!showPassword}>
						<EyeOpen className="w-6 h-6 stroke-neutral" />
					</Show>
				</button>
				<input
					class="input input-bordered w-full bg-white text-neutral"
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
					class="input input-bordered w-full bg-white text-neutral"
					type="password"
					name="confirm-password"
					id="confirm-password"
				/>
			</div>
			<input type="hidden" id="token" name="token" bind:value={token} />
			<div class="flex-col items-start w-full gap-4 md:flex-row mt-2">
				{@render renderCustomRecaptchaBtn(form?.missingRecaptchaToken)}
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

{#snippet renderCustomRecaptchaBtn({success})}
	<Show when={success} fallback={renderErrorCaptchaBtn}>
		{@render renderNormalCaptchaBtn()}
	</Show>
{/snippet}

{#snippet renderNormalCaptchaBtn()}
	<button
			type="button"
			id="g-recaptcha"
			name="g-recaptcha"
			on:click={onSubmitCaptcha}
			class="g-recaptcha btn btn-ghost text-error text-xs font-light normal-case"
			class:text-success={tokenAcquired}
			class:loading={isLoadingToken}
		>
			{@render renderCheckIcon()} human verification
	</button>	
{/snippet}

{#snippet renderErrorCaptchaBtn()}
<button
		type="button"
		id="g-recaptcha"
		name="g-recaptcha"
		on:click={onSubmitCaptcha}
		class="g-recaptcha btn btn-ghost text-neutral text-xs font-light normal-case"
		class:text-success={tokenAcquired}
		class:loading={isLoadingToken}
	>
		{@render renderCheckIcon()} human verification
	</button>
{/snippet}

{#snippet renderCheckIcon()}
	<Show when={!isLoadingToken}>
		<Check className={`w-8 h-8 ${tokenAcquired ? 'stroke-success' : 'stroke-error'}`} />
	</Show>
{/snippet}