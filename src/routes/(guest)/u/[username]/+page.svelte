<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Send from '$lib/components/icons/send.svelte';
</script>

<svelte:head>
	<title>CNFS - {$page.params.username}</title>
	<meta name="description" content={`Send anonymous message to ${$page.params.username}`} />
</svelte:head>

<div class="min-h-screen px-4">
	<div class="h-full container mt-12 max-w-2xl m-auto bg-[#EEEEEE] px-4 py-6 rounded-md">
		<h1 class="font-normal text-base text-neutral text-center mb-4">Send your dearest message to {$page.params.username} 😚</h1>
		<form class="form-control h-full w-full m-auto" method="POST" action="?/signIn" use:enhance>
			<div class="w-full rounded-sm">
				<textarea placeholder="Hello my dear friend, you are doing great 🥰..." class="w-full h-full rounded-sm outline-none resize-none text-area bg-white text-neutral p-2" name="message" id="message" cols="30" rows="10"></textarea>
			</div>
			<a href="/#privacy-policy" class="link link-neutral text-sm">Privacy and policy</a>
			<a href="/#guidelines" class="link link-neutral text-sm">Guidelines</a>
			<div class="flex flex-col md:flex-row-reverse items-center gap-2 m-auto w-full mt-4">
				<button class="btn btn-error rounded-md w-full md:w-1/2 normal-case gap-2">
					<Send /> Send
				</button>
			</div>
		</form>
	</div>
</div>
