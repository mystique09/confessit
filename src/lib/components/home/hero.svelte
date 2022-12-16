<script>

	import ShowcaseCard from "./showcase_card.svelte";

</script>
<div class="hero h-screen px-4">
	<div class="hero-content w-full h-full flex justify-evenly flex-col md:flex-row items-center gap-1">
		<div>
			<p class="max-w-md text-xl tracking-wide">Welcome to <span class="text-error">CNFS</span> - the place where you can send anonymous messages to anyone, anywhere. 	With CNFS, you can say whatever you want, to whoever you want, without revealing your identity. Start sending anonymous messages now and discover the freedom of being able to say whatever you want, without fear of judgment or retribution.
			</p>
			<a class="mt-4 btn btn-wide btn-outline btn-error rounded-full normal-case text-sm" href="/sign-up">Click here to join</a>
		</div>
		<div class="messages hidden lg:block">
			<ShowcaseCard />
		</div>
	</div>
</div>