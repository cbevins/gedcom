<script>
	import Surname from '$lib/svelte/Surname.svelte'
	import Title1 from '$lib/svelte/Title1.svelte'
	// export let data	// whatever is returned from +page.js
</script>

<svelte:head>
	<title>Bevins-Riley</title>
	<meta name="description" content="Bevins-Heddens & Riley-Trombley Genealogy" />
</svelte:head>

<div class='container-fluid'>
	<Title1 title="Welcome to Collin's Genealogy Site" />
	<p>This is where I organize the information I collect
		while researching my family tree
		(<Surname name='Bevins-Heddens' />),
		and the family tree of my wife, Barbara Riley
		(<Surname name='Riley-Trombley' />).
		So it is a continuous work-in-progress.
	</p>
	<p>
		Explore the menus to see what I've collected so far!
	</p>
</div>
