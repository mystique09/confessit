<script lang="ts">
	import UserAvatar from '$lib/components/icons/user_avatar.svelte';

	export let data: PostComment;
</script>

<div class="comment h-auto mt-2 w-full p-2">
	<div class="head my-1 flex flex-row items-center justify-start">
		<UserAvatar className="w-6 h-6 rounded-sm" />
		<span class="text-accent text-xs">{data.user_identity_id}</span>
	</div>
	<div class="content w-full items-end ml-4 pr-2">
		<p class="text-sm p-2 break-words w-full">{data.content}</p>
	</div>
</div>
