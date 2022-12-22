<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let chart: Chart<'line', number[], string>;

	export let data: PageData;

	onMount(() => {
		canvas = <HTMLCanvasElement>document.getElementById('chart');
		context = canvas.getContext('2d');
		const messages: Message[] = data.messages;

		const groupedData = messages.reduce((acc, message) => {
			let { created_at } = message;
			created_at = new Date(created_at).toLocaleString();

			if (!acc[created_at]) {
				acc[created_at] = [message];
			} else {
				acc[created_at].push(message);
			}

			return acc;
		}, {});

		const unseenMessages = messages.filter((message) => !message.seen)
  			.reduce((acc, message) => {
				let { created_at } = message;
				created_at = new Date(created_at).toLocaleString();

				if (!acc[created_at]) {
					acc[created_at] = [message];
				} else {
					acc[created_at].push(message);
				}
				return acc;
		}, {});

		const labels = Object.keys(groupedData);
		const dataset = labels.map((label) => groupedData[label].length);
		const unseenDataset = labels.map((label) => unseenMessages[label]?.length || 0);

		chart = new Chart(context, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						label: 'Total received messages',
						backgroundColor: 'rgb(100, 59, 255)',
						borderColor: 'rgb(100, 59, 255)',
						data: dataset,
					},
					{
						label: 'Total unseen messages',
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: unseenDataset,
					}
				]
			},
			options: {}
		});
	});
</script>

<div class="w-full h-screen bg-base py-6 px-4">
	<h1 class="text-white text-2xl md:text-4xl mb-8">Statistics</h1>
	<div class="h-1/2 md:h-3/4 w-full">
		<canvas id="chart" />
	</div>
</div>
