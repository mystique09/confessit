<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import type { PageData } from './$types';

	let canvasRef = $state<HTMLCanvasElement>();
	let context = $state<CanvasRenderingContext2D>();
	let chart = $state<Chart<'line', number[], string>>();

	let dataset = $state([]);
	let unseenDataset = $state([]);

	let { data } = $props<{ data: PageData }>();

	$effect(() => {
		canvasRef = <HTMLCanvasElement>document.getElementById('chart');
		context = canvasRef.getContext('2d');
		const messages: Message[] = data.messages;

		const totalMessageReceived = messages.reduce((acc, message) => {
			let { created_at } = message;
			const date = new Date(created_at);
			const format = `${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;

			if (!acc[format]) {
				acc[format] = [message];
			} else {
				acc[format].push(message);
			}

			return acc;
		}, {});

		const totalUnseenMessages = messages
			.filter((message) => !message.seen)
			.reduce((acc, message) => {
				let { created_at } = message;
				const date = new Date(created_at);
				const format = `${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;

				created_at = new Date(created_at).toLocaleString();

				if (!acc[format]) {
					acc[format] = [message];
				} else {
					acc[format].push(message);
				}
				return acc;
			}, {});

		const labels = Object.keys(totalMessageReceived);
		dataset = labels.map((label) => totalMessageReceived[label].length);
		unseenDataset = labels.map((label) => totalUnseenMessages[label]?.length || 0);

		chart = new Chart(context, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						label: 'Received messages',
						backgroundColor: 'rgb(100, 59, 255)',
						borderColor: 'rgb(100, 59, 255)',
						data: dataset
					},
					{
						label: 'Unopened messages',
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: unseenDataset
					}
				]
			},
			options: {}
		});
	});
</script>

<div class="w-full h-screen bg-base py-6 px-4">
	<h1 class="text-white text-2xl md:text-4xl mb-8">Statistics</h1>
	<div class="w-full max-w-lg">
		<div class="stats w-full stats-vertical text-center md:stats-horizontal shadow gap-2">
			<div class="stat bg-secondary text-secondary-content">
				<div class="stat-title">Received message</div>
				<div class="stat-value">
					{dataset.length > 0 ? dataset.reduce((acc, curr) => acc + curr) : 0}
				</div>
			</div>
			<div class="stat bg-secondary text-secondary-content">
				<div class="stat-title">Unopened messages</div>
				<div class="stat-value">
					{unseenDataset.length > 0 ? unseenDataset.reduce((acc, curr) => acc + curr) : 0}
				</div>
			</div>
		</div>
	</div>
	<div class="max-w-4xl m-auto">
		<div class="h-1/2 md:h-3/4 max-w-2xl w-full">
			<canvas id="chart" />
		</div>
	</div>
</div>
