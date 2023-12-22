<script lang="ts">
	import CommentComponent from './comment_component.svelte';

	export let comments: PostComment[];
</script>

<div id="comments" class="comments mt-14 w-full">
	<div class="w-full bg-neutral">
		<div class="collapse collapse-open">
			<input type="checkbox" name="comments" id="comments" />
			<div class="collapse-title">Comments</div>
			<div class="collapse-content">
				{#if comments.length > 0}
					{#each comments as postComment}
						<CommentComponent data={postComment} />
					{/each}
				{:else}
					<h1>No comments yet.</h1>
				{/if}
			</div>
		</div>
	</div>
</div>
