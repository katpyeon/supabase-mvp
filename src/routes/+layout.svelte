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
	<footer class="footer">
		<div class="footer-container">
			<div class="copyright">
				© {new Date().getFullYear()} Supabase MVP Blog. All rights reserved.
			</div>
			<div class="contact">
				Contact: <a href="mailto:katpyeong@gmail.com">katpyeong@gmail.com</a>
			</div>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		padding: var(--spacing-5) 0;
	}

	.footer {
		padding: var(--spacing-5) 0;
		background-color: var(--background);
		border-top: 1px solid var(--border);
		margin-top: auto;
	}

	.footer-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 var(--spacing-5);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-2);
	}

	.copyright, .contact {
		font-size: var(--font-size-sm);
		color: #666;
	}

	.contact a {
		color: var(--foreground);
		text-decoration: none;
	}

	.contact a:hover {
		text-decoration: underline;
	}
</style>
