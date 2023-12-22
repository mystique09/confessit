<script>
	import Footer from '$lib/components/layout/footer.svelte';
	import Faq from '$lib/components/feature/home/faq.svelte';
	import Guidelines from '$lib/components/feature/home/guidelines.svelte';
	import Hero from '$lib/components/feature/home/hero.svelte';
	import PrivacyPolicy from '$lib/components/feature/home/privacy_policy.svelte';
	import WhatIsCnfs from '$lib/components/feature/home/what_is_cnfs.svelte';
</script>

<svelte:head>
	<title>CNFS - Get Started</title>
	<meta name="description" content="Welcome to CNFS!" />
</svelte:head>

<Hero />
<WhatIsCnfs />
<Guidelines />
<Faq />
<PrivacyPolicy />
<Footer />
