<script>
	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>CNFS - {$page.params.username}</title>
	<meta name="description" content={`Send anonymous message to ${$page.params.username}`} />
</svelte:head>

<h1>{$page.params.username}</h1>