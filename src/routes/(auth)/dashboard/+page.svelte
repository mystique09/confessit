<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>CNFS - Dashboard</title>
	<meta name="description" content="Welcome to your dashboard" />
</svelte:head>

<h1>dashboard</h1>
<p>Welcome to dashboard, {data.user.username ?? ""}</p>