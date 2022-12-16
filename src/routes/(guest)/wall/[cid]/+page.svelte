<script>

	import { page } from "$app/stores";

</script>

<svelte:head>
	<title>CNFS - Wall {$page.params.cid}</title>
	<meta name="description" content={`View the ${$page.params.cid}'s confession.`} />
</svelte:head>

<h1>{$page.params.cid}</h1>