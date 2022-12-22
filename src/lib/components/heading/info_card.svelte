<script lang="ts">
	export let info: string;
	export let heading: string;
</script>


<div class="relative container h-60 md:h-[300px] bg-white/20 rounded-md m-auto flex flex-col gap-4 items-center justify-center">
	<div class="flex flex-row w-full items-center justify-around">
		<div class="w-20 h-10 -rotate-6">
			<img src="/favicon.png" alt="cnfs logo" class="w-full h-full" />
		</div>
		<h1 class="text-xs md:text-lg font-bold rotate-45 text-base-content">{info}</h1>
	</div>
	<h1 class="font-bold text-xl md:text-4xl text-white">{heading}</h1>
</div>
<slot />