<script>
	import { getSylvan } from '$lib/Sylvan/js/singletons.js'
	import NotablesPage from '$lib/Sylvan/svelte/NotablesPage.svelte'

    // console.log('RUNNING src/routes/people/interest')

    const tabs = [
        {id: 'BH', title: 'Bevins-Heddens', c: 'nav-link active', class: 'active'},
        {id: 'RT', title: 'Riley-Trombley', c: 'nav-link', class: 'fade'},
    ]
</script>

<div class="container">
	<h4 class="card-title">Notable Observations, People, and Events</h4>
	<div class="card">
	<!-- Nav tabs -->
		<ul class="nav nav-tabs" role="tablist">
			{#each tabs as tab, i}
				<li class="nav-item">
					<a class={tab.c} data-bs-toggle="tab" href={'#'+tab.id}>{tab.title}</a>
				</li>
			{/each}
		</ul>

		<!-- Tab panes -->
		<div class="tab-content">
			{#each tabs as tab, i}
				<div id={tab.id} class="container tab-pane {tab.class}"><br>
					<div class="card">
						<div class="card-body">
							<NotablesPage sylvan={getSylvan()} tree={tab.id}/>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
