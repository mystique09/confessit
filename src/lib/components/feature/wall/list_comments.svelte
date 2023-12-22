<script lang="ts">
	import Show from '$lib/components/shared/show.svelte';
	import CommentComponent from './comment_component.svelte';

	type Props = {
		comments: PostComment[];
	};

	let { comments } = $props<Props>();
</script>

<div id="comments" class="comments mt-14 w-full">
	<div class="w-full bg-neutral">
		<div class="collapse collapse-open">
			<input type="checkbox" name="comments" id="comments" />
			<div class="collapse-title">Comments</div>
			<div class="collapse-content">
				<Show when={comments.length > 0} fallback={noCommentFallback}>
					{#each comments as postComment}
						<CommentComponent data={postComment} />
					{/each}
				</Show>
			</div>
		</div>
	</div>
</div>

{#snippet noCommentFallback()}
	<h1>No comments yet.</h1>
{/snippet}
