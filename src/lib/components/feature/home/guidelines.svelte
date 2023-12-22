<script>
	import InfoCard from '$lib/components/heading/info_card.svelte';
</script>

<div
	class="h-auto py-12 px-4 bg-gradient-to-b from-error/20 via-error/30 to-error/40"
	id="guidelines"
>
	<div class="wrap h-full w-full max-w-4xl m-auto">
		<InfoCard heading="Guidelines" info="No racism!!">
			<ul class="flex flex-col gap-4 items-start justify-evenly mt-8">
				<li>
					<p>
						<span class="text-error-content text-xl">Keep all confessions anonymous:</span>
						Do not include any personal information in your confessions, such as your name, age, or location.
					</p>
				</li>
				<li>
					<p>
						<span class="text-error-content text-xl">Be respectful:</span>
						Treat others with kindness and respect, even if you do not agree with their opinions or confessions.
					</p>
				</li>
				<li>
					<p>
						<span class="text-error-content text-xl">No spam or self-promotion:</span>
						Do not spam the site with irrelevant or promotional content.
					</p>
				</li>
				<li>
					<p>
						<span class="text-error-content text-xl">No illegal or harmful activities:</span>
						Do not use CNFS to engage in illegal or harmful activities.
					</p>
				</li>
			</ul>
		</InfoCard>
	</div>
</div>
