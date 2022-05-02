<script>
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import '../app.css';
</script>

<Navbar />
<slot />
<Footer />