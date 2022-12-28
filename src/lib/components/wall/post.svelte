<script lang="ts">
	import ArrowUp from '../icons/arrow_up.svelte';
	import Comment from '../icons/comment.svelte';

	export let item: Post;
</script>

<div class="post max-w-xl w-full min-h-[120px]">
	<div class="post_wrap bg-neutral flex flex-row items-center justify-between">
		<div class="reaction h-full w-12 bg-neutral flex flex-col items-center gap-2 md:gap-3 ml-2">
			<div class="flex flex-col btn btn-ghost btn-sm h-auto">
				<span class="text-center text-xs">0</span>
				<ArrowUp className="w-6 h-6" />
			</div>
			<div class="flex flex-col btn btn-ghost btn-sm h-auto">
				<ArrowUp className="w-6 h-6 rotate-180" />
				<span class="text-center text-xs">0</span>
			</div>
		</div>
		<a
			href={'/wall/' + item.id}
			class="hover:bg-neutral-content/20 w-full flex flex-col justify-between gap-4 items-start p-2"
		>
			<div class="avatar h-7">
				<h1 class="text-sm">
					<span class="text-xs">{item.user_identity_id}</span> -
					<span class="text-white/40 font-light text-xs"
						>{new Date(item.created_at).toLocaleDateString()}</span
					>
				</h1>
			</div>
			<div class="h-full">
				<p class="text-xs my-6 text-ellipsis">
					{item.content}
				</p>
			</div>
		</a>
	</div>
</div>
