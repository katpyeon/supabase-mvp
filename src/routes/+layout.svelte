<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="app">
	<Header />
	<main>
		<div class="container">
			<slot />
		</div>
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		padding: 20px 0;
	}
</style>
