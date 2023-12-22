<script>
	import InfoCard from '$lib/components/layout/info_card.svelte';
</script>

<div
	class="h-auto py-12 px-4 bg-gradient-to-b from-error/60 via-error/70 to-error/80"
	id="privacy-policy"
>
	<div class="wrap h-full w-full max-w-4xl m-auto">
		<InfoCard heading="Privacy policy" info="What information do we collect?">
			<ul class="flex flex-col gap-4 items-start justify-evenly mt-8">
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content">What information do we collect?</span>
					<p class="collapse-content text-neutral-content">
						When you use CNFS, we do not collect any personal information about you, such as your
						name, age, or location. We only collect the content of your messages, which are stored
						anonymously on our servers.
					</p>
				</li>
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content">How do we use your information?</span>
					<p class="collapse-content text-neutral-content">
						We use the content of your messages to provide the services offered on CNFS, such as
						allowing you to send anonymous messages to other users. We do not share your messages
						with third parties, and we do not use them for any other purpose.
					</p>
				</li>
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content"
						>How do we protect your information?</span
					>
					<p class="collapse-content text-neutral-content">
						We take precautions to protect your information from unauthorized access, use, or
						disclosure. We use secure servers and encryption to ensure that your messages are kept
						private and secure.
					</p>
				</li>
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content">What are your privacy rights?</span>
					<p class="collapse-content text-neutral-content">
						You have the right to request access to the personal information we hold about you and
						to ask that your personal information be corrected, updated, or deleted. If you would
						like to exercise this right, please contact us at <span
							class="badge badge-sm badge-info">dummyemailcnfs@support.com</span
						>.
					</p>
				</li>
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content">Changes to this privacy policy</span>
					<p class="collapse-content text-neutral-content">
						We may update our privacy policy from time to time to reflect changes to our practices
						or for other operational, legal, or regulatory reasons. We encourage you to review the
						privacy policy whenever you access our site to stay informed about our information
						practices and your privacy rights.
					</p>
				</li>
				<li class="collapse bg-neutral">
					<input type="checkbox" />
					<span class="collapse-title text-neutral-content">Contact us</span>
					<p class="collapse-content text-neutral-content">
						If you have any questions or concerns about our privacy policy or the use of your
						personal information, please contact us at <span class="badge badge-sm badge-info"
							>dummyemailcnfs@support.com</span
						>.
					</p>
				</li>
			</ul>
		</InfoCard>
	</div>
</div>
