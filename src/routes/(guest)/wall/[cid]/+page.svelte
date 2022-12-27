<script lang="ts">
	import { page } from '$app/stores';
	import ArrowUp from '$lib/components/icons/arrow_up.svelte';
	import Comment from '$lib/components/icons/comment.svelte';
	import UserAvatar from '$lib/components/icons/user_avatar.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let item: Post = data.post;
	let comments: PostComment[] = data.comments;
</script>

<svelte:head>
	<title>CNFS - Wall {$page.params.cid}</title>
	<meta name="description" content={`View the ${$page.params.cid}'s confession.`} />
</svelte:head>

<div class="h-full px-4 pb-4 w-full">
	<div class="wrap w-full h-full lg:flex lg:flex-row lg:justify-evenly m-auto">
		<div class="post max-w-xl w-full min-h-[150px] m-auto">
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
				<div class="content w-full flex flex-col justify-between gap-4 items-start p-2">
					<div class="avatar h-7">
						<h1 class="text-sm">
							<span class="text-xs">anonymous</span> -
							<span class="text-white/40 font-light text-xs"
								>{new Date(item.created_at).toTimeString()}</span
							>
						</h1>
					</div>
					<p
						class="post_content text-sm md:text-sm tracking-wide text-ellipsis overflow-hidden mb-6"
					>
						{item.content}
					</p>
					<div class="flex flex-row items-center gap-2">
						<Comment className="w-5 h-5 stroke-accent" />
						<span class="text-xs text-white/40">{comments.length} comments</span>
					</div>
				</div>
			</div>
			<div class="divider" />
			<div class="px-4 bg-neutral py-2 flex flex-col items-start gap-4">
				<form method="POST" action="?/newComment" class="new_comment h-24 w-full">
					{#if data.authenticated}
						<p class="text-sm text-white">Comment anonymously</p>
					{:else}
						<a href="/sign-in" class="text-sm underline text-white">Sign in to comment</a>
					{/if}
					<textarea
						class="mt-2 w-full h-full text-xs resize-none textarea textarea-primary textarea-bordered rounded-sm p-2"
						name="comment"
						disabled={!data.authenticated}
						id="comment"
						cols="30"
						rows="10"
					/>
					<div class="w-full flex items-center justify-end">
						{#if data.authenticated}
							<button class="btn btn-accent btn-sm normal-case gap-2 rounded-sm">
								<Comment /> Comment
							</button>
						{/if}
					</div>
				</form>
				<div class="comments mt-14">
					<div class="w-full bg-neutral">
						<div class="collapse">
							<input type="checkbox" name="comments" id="comments" />
							<div class="collapse-title">Comments</div>
							<div class="collapse-content">
								{#if comments.length > 0}
									{#each comments as comment}
										<div class="comment h-auto bg-base-100 mt-2 w-full p-2">
											<div class="head my-4 flex flex-row items-center justify-start">
												<UserAvatar className="w-6 h-6 rounded-sm" />
												<span class="text-accent text-xs">{comment.user_identity_id}</span>
											</div>
											<div class="content w-full items-end ml-4 pr-2">
												<p class="text-sm p-2">{comment.content}</p>
											</div>
										</div>
									{/each}
								{:else}
									<h1>No comments yet.</h1>
								{/if}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
