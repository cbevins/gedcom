<script>
	import NavBar from './NavBar.svelte'
	import './styles.css'
</script>

<div class="container-fluid">
	<div class="row">
		<NavBar />
	</div>

	<main>
		<slot />
	</main>

	<footer>
	</footer>
</div>
