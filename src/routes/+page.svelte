<script>
	import Footer from '$lib/components/footer.svelte';
	import Faq from '$lib/components/home/faq.svelte';
	import Guidelines from '$lib/components/home/guidelines.svelte';
	import Hero from '$lib/components/home/hero.svelte';
	import WhatIsCnfs from '$lib/components/home/what_is_cnfs.svelte';
</script>

<svelte:head>
	<title>CNFS - Get Started</title>
	<meta name="description" content="Welcome to CNFS!" />
</svelte:head>

<Hero />
<WhatIsCnfs />
<Guidelines />
<Faq />
<Footer />
