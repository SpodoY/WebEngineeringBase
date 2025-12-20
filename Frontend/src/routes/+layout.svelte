<script lang="ts">
	// import './layout.css';
	import '../styles/global-styles.css'
	import '../styles/snackbar.css'
	import '../styles/accessability.css'
	import favicon from '$lib/assets/favicon.svg';
	import NavigationBar from '$lib/components/NavigationBar.svelte';
	import Snackbar from '$lib/components/Snackbar.svelte';
	
	let { children } = $props();
</script>

<NavigationBar />
<Snackbar />

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
