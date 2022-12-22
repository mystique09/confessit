<script>
	import { invalidateAll } from '$app/navigation';
	import ArrowLeft from '$lib/components/icons/arrow_left.svelte';
	import Chart from '$lib/components/icons/chart.svelte';
	import EnvelopeOpen from '$lib/components/icons/envelope_open.svelte';
	import Gear from '$lib/components/icons/gear.svelte';
	import UserAvatar from '$lib/components/icons/user_avatar.svelte';

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

<div class="w-full h-full flex flex-col md:flex md:flex-row items-between">
	<div class="sidebar pb-8 h-full flex-0">
		<div
			class="md:mt-8 mt-4 mb:6 w-full md:w-64 h-[90%] px-4 flex flex-col md:items-center justify-start gap-4"
		>
			<ul class="h-auto md:mx-auto flex flex-col flex-1 gap-6 items-start">
				<li>
					<a
						href="/dashboard"
						class="hover:scale-110 flex gap-2 flex-row items-center justify-between w-full text-xl"
					>
						<EnvelopeOpen className="w-6 h-6 stroke-neutral-content" />
						Messages
					</a>
				</li>
				<li>
					<a
						href="/dashboard/statistics"
						class="hover:scale-110 flex gap-2 flex-row items-center justify-between w-full text-xl"
					>
						<Chart className="w-6 h-6 stroke-neutral-content" />
						Statistics
					</a>
				</li>
				<li class="md:hidden flex">
					<a
						href="/dashboard/account"
						class="hover:scale-110 flex gap-2 flex-row items-center justify-between w-full text-xl"
					>
						<UserAvatar className="w-6 h-6 stroke-neutral-content" />
						Account
					</a>
				</li>
			</ul>
		</div>
	</div>
	<slot />
</div>
