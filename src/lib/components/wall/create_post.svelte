<script lang="ts">
	import Globe from '$lib/components/icons/globe.svelte';
	import Send from '$lib/components/icons/send.svelte';
	import Delete from '../icons/delete.svelte';
</script>

<label
	for="create_modal"
	class="fixed bottom-6 right-6 bg-neutral w-16 h-16 flex items-center justify-center rounded-full btn btn-ghost"
>
	<Globe className="w-full h-full" />
</label>

<input type="checkbox" id="create_modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box h-full">
		<h3 class="modal-title font-bold text-lg text-center">
			Create new post, and let the public know.
		</h3>
		<p class="py-4">Say whatever you want, and please follow the guidelines.</p>
		<form class="w-full m-auto" method="POST" action="/wall/?/createNewPost">
			<textarea
				class="textarea textarea-primary w-full resize-none"
				name="content"
				id=""
				cols="30"
				rows="10"
			/>
			<div class="modal-action flex flex-row items-center justify-around">
				<label for="create_modal" class="btn btn-error normal-case gap-2">
					<Delete /> Cancel
				</label>
				<button class="btn btn-success normal-case gap-2">
					<Send /> Submit
				</button>
			</div>
		</form>
	</div>
</div>
