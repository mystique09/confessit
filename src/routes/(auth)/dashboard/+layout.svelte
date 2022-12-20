<script>
	import { invalidateAll } from '$app/navigation';
	import ArrowLeft from '$lib/components/icons/arrow_left.svelte';
	import Chart from '$lib/components/icons/chart.svelte';
	import EnvelopeOpen from '$lib/components/icons/envelope_open.svelte';

	const signoutHandler = async () => {
		try {
			const req = await fetch('/logout', {
				method: 'POST'
			});
			const data = await req.json();
			console.log(data);
			await invalidateAll();
		} catch (e) {
			console.log(e);
		}
	};
</script>

<div class="w-full h-screen flex flex-row items-between">
	<div class="sidebar h-full flex-0">
		<div class="mt-8 w-16 h-[90%] px-2 flex flex-col items-center justify-start gap-4">
			<ul class="h-auto mx-auto flex flex-col flex-1 gap-6 items-center">
				<li>
					<a href="/dashboard">
						<EnvelopeOpen className="w-6 h-6 stroke-neutral-content" />
					</a>
				</li>
				<li>
					<a href="/dashboard/statistics">
						<Chart className="w-6 h-6 stroke-neutral-content" />
					</a>
				</li>
			</ul>
			<div class="flex-0">
				<button type="button" on:click={signoutHandler}>
					<ArrowLeft className="w-6 h-6 stroke-neutral-content" />
				</button>
			</div>
		</div>
	</div>
	<slot />
</div>