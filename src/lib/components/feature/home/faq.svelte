<script>
	import InfoCard from '$lib/components/heading/info_card.svelte';
</script>

<div class="h-auto py-12 px-4 bg-gradient-to-b from-error/40 via-error/50 to-error/60" id="faq">
	<div class="wrap h-full w-full max-w-4xl m-auto">
		<InfoCard heading="Frequently Asked Questions" info="Anonymous?">
			<ul class="flex flex-col gap-4 items-start justify-evenly mt-8">
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content">What is CNFS?</span>
					<p class="collapse-content text-neutral-content">
						CNFS stands for Confess and Never Forget Secrets, and it is a website that allows users
						to share their deepest, darkest secrets without fear of judgment or retribution.
					</p>
				</li>
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content">Is CNFS anonymous?</span>
					<p class="collapse-content text-neutral-content">
						Yes, CNFS is anonymous, so users can confess their thoughts and feelings without
						worrying about who will see them.
					</p>
				</li>
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content">What is the purpose of CNFS?</span>
					<p class="collapse-content text-neutral-content">
						The purpose of CNFS is to provide a safe and anonymous space for users to share their
						secrets and thoughts with others. This can help users to let go of the secrets that have
						been weighing them down and can provide a sense of relief and support from others who
						have similar experiences.
					</p>
				</li>
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content">Who can use CNFS?</span>
					<p class="collapse-content text-neutral-content">
						Anyone who is looking to share their secrets or thoughts with others can use CNFS. Our
						website is open to people of all ages, backgrounds, and experiences.
					</p>
				</li>
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content">How do I start confessing on CNFS?</span
					>
					<p class="collapse-content text-neutral-content">
						To start confessing on CNFS, simply visit our website and create an account. From there,
						you can start sharing your secrets and thoughts with our community of users. Remember to
						always be respectful and considerate of others when using our website.
					</p>
				</li>
			</ul>
		</InfoCard>
	</div>
</div>
