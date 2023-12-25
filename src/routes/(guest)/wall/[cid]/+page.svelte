<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import ListComments from '$lib/components/feature/wall/list_comments.svelte';
	import Comment from '$lib/components/icons/comment.svelte';
	import Show from '$lib/components/shared/show.svelte';
	import { getContext } from 'svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();
	let ctx: { isAuthenticated: boolean } = getContext('userAuth');

	let item = $state<Post>(data.post);
	let comments = $state<PostComment[]>(data.comments);
	let isLoading = $state(false);

	const submitComment = () => {
		isLoading = true;
	};

	$effect(() => {
		if (form?.commentFailed || form.commentSuccess) {
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<title>CNFS - Wall {$page.params.cid}</title>
	<meta name="description" content={`View the ${$page.params.cid}'s confession.`} />
</svelte:head>

<div class="h-full px-2 md:px-4 w-full my-4">
	<div class="wrap w-full h-full lg:flex lg:flex-row lg:justify-evenly m-auto">
		<div class="post max-w-xl w-full min-h-[150px] m-auto">
			<div class="post_wrap px-6 py-1 bg-neutral flex flex-row items-center justify-between">
				<!-- <div class="reaction h-full w-12 bg-neutral flex flex-col items-center gap-2 md:gap-3 ml-2">
					<div class="flex flex-col btn btn-ghost btn-sm h-auto">
						<span class="text-center text-xs">0</span>
						<ArrowUp className="w-6 h-6" />
					</div>
					<div class="flex flex-col btn btn-ghost btn-sm h-auto">
						<ArrowUp className="w-6 h-6 rotate-180" />
						<span class="text-center text-xs">0</span>
					</div>
				</div> -->
				<div class="h-full content w-full flex flex-col justify-between gap-4 items-start p-2">
					<div class="avatar w-full h-7 flex items-center justify-between">
						<h1 class="text-sm">
							<span class="text-xs">{item.user_identity_id}</span> -
							<span class="text-white/40 font-light text-xs"
								>{new Date(item.created_at).toLocaleDateString()}</span
							>
						</h1>
					</div>
					<p
						class="h-full w-full post_content text-sm md:text-sm tracking-wide break-words text-ellipsis overflow-hidden mb-6"
					>
						{item.content}
					</p>
					<a href="#comments" class="flex flex-row items-center gap-2">
						<Comment className="w-5 h-5 stroke-accent" />
						<span class="text-xs text-white/40">{comments.length} comments</span>
					</a>
				</div>
			</div>
			<div class="px-4 bg-neutral w-full md:w-auto py-2 flex flex-col items-start gap-4">
				<div class="divider" />
				<form method="POST" action="?/newComment" class="new_comment h-24 w-full" use:enhance>
					<Show when={ctx.isAuthenticated}>
						<p class="text-sm text-white">Comment anonymously</p>

						{#snippet fallback()}
							<a href="/sign-in" class="text-sm underline text-white">Sign in to comment</a>
						{/snippet}
					</Show>
					<Show when={form?.commentSuccess}>
						<p class="text-xs text-success">Comment added.</p>

						{#snippet fallback()}
							<p class="text-xs text-error">Comment is required</p>
						{/snippet}
					</Show>

					<textarea
						class:textarea-error={form?.commentFailed}
						class="w-full h-full text-xs resize-none textarea textarea-primary textarea-bordered rounded-sm p-2"
						name="comment"
						disabled={!data.authenticated}
						id="comment"
						cols="30"
						rows="10"
					/>
					<div class="w-full flex items-center justify-end">
						<Show when={ctx.isAuthenticated}>
							<button
								on:click={submitComment}
								class:btn-disabled={isLoading}
								class:loading={isLoading}
								class="btn btn-accent btn-sm normal-case gap-2 rounded-sm"
							>
								<Show when={!isLoading}>
									<Comment />
								</Show>
								Comment
							</button>
						</Show>
					</div>
				</form>
				<ListComments {comments} />
			</div>
		</div>

		<div class="w-1/4 mr-auto">
			<div class="guidelines_card h-56 w-full bg-neutral hidden lg:flex lg:flex-col p-4">
				<ul class="text-xs flex flex-col gap-2">
					<li><a class="hover:underline" href="/#privacy-policy">Privacy policy</a></li>
					<li><a class="hover:underline" href="/#guidelines">Guidelines</a></li>
					<li><a class="hover:underline" href="/#faq">FAQ</a></li>
				</ul>
				<div class="divider" />
				<ul class="text-xs flex flex-col gap-2">
					<a href="https://github.com/mystique09/confessit" class="link link-hover">Github</a>
					<a href="https://twitter.com/voidthebug" class="link link-hover">Twitter</a>
					<a href="https://github.com/mystique09" class="link link-hover">Linkedin</a>
				</ul>
			</div>
		</div>
	</div>
</div>