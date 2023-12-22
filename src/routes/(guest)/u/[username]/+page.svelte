<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Check from '$lib/components/icons/check.svelte';
	import Send from '$lib/components/icons/send.svelte';
	import Show from '$lib/components/shared/show.svelte';
	import { slide } from 'svelte/transition';
	import type { ActionData, PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();

	let isSending = $state(false);
	let submitError = $state(form?.messageFail === "Internal server error!" || form?.missingRecaptchaToken || form?.invalidRecaptchaToken);

	const sendHandler = () => {
		isSending = true;
	};

	$effect(() => {
		if (submitError) {
			isSending = false;
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
	<title>CNFS - {$page.params.username}</title>
	<meta name="description" content={`Send anonymous message to ${$page.params.username}`} />
</svelte:head>

<Show when={!form?.messageSent} fallback={successMessage}>
	<div class="min-h-screen px-4">
		<div class="h-full container mt-12 max-w-2xl m-auto bg-[#EEEEEE] px-4 py-6 rounded-md">
			<h1 class="font-normal text-base text-neutral text-center mb-4">
				Send your dearest message to {$page.params.username} 😚
			</h1>
			<Show when={submitError}>
				<div
					in:slide|global={{ delay: 300 }}
					tabindex="-1"
					class="collapse w-full md:w-3/4 m-auto collapse-open"
				>
					<div class="collapse-title text-error text-base">Unable to send message 😐</div>
					<div class="collapse-content text-sm">
						<p class="text-error">{form?.message}</p>
					</div>
				</div>
			</Show>
			<form
				class="form-control h-full w-full m-auto"
				method="POST"
				action="?/sendMessage"
				use:enhance
			>
				<div class="w-full rounded-sm">
					<textarea
						placeholder="Hello my dear friend, you are doing great 🥰..."
						class="w-full h-full rounded-sm outline-none resize-none text-area bg-white text-neutral p-2"
						name="message"
						id="message"
						cols="30"
						rows="10"
					/>
				</div>
				<input name="userId" id="userId" type="text" hidden value={data.userId} />
				<input type="hidden" id="token" name="token" bind:value={token} />
				<div class="flex flex-row w-full items-center justify-between">
					<div class="flex flex-col w-1/2 md:w-1/4">
						<a href="/#privacy-policy" class="link link-neutral text-sm">Privacy and policy</a>
						<a href="/#guidelines" class="link link-neutral text-sm">Guidelines</a>
					</div>
					{@render renderCustomRecaptchaBtn(form?.missingRecaptchaToken)}
				</div>
				<div class="flex flex-col md:flex-row-reverse items-center gap-2 m-auto w-full mt-4">
					<button
						on:click={sendHandler}
						class="btn btn-error rounded-md w-full md:w-1/4 normal-case gap-2"
						class:loading={isSending}
					>
						<Show when={!isSending}>
							<Send />
							Send
						</Show>
					</button>
				</div>
			</form>
		</div>
	</div>
</Show>

{#snippet successMessage()}
	<div class="h-screen flex flex-col items-center max-w-2xl m-auto justify-center px-4">
		<h1 class="text-8xl mb-7">💖</h1>
		<p class="font-bold text-4xl">Message sent!</p>
		<p class="text-sm mt-3 text-center tracking-wide">
			Your message has been successfully sent! Thank you for using CNFS to send anonymous messages
			to your friends, family, or anyone else you want to reach. <a
				class="link link-underline link-primary"
				href="/">Click here to go back to homepage.</a
			>
		</p>
	</div>
{/snippet}

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