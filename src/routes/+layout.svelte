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
		padding: 20px 0;
	}

	.footer {
		padding: 20px 0;
		background-color: var(--background);
		border-top: 1px solid var(--border);
		margin-top: auto;
	}

	.footer-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
	}

	.copyright, .contact {
		font-size: 14px;
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
