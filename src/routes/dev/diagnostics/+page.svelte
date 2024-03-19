<script>
	import { ged } from '$lib/js/store.js'
	import Diagnostics from '$lib/svelte/Diagnostics.svelte'
	import SylvanSummary from '$lib/svelte/SylvanSummary.svelte'
	import { getSylvan } from '$lib/js/sylvan.js'

	const sylvan = getSylvan()
    const tabs = [
        {href: '#gedcom', title: 'GEDCOM File', c: 'nav-link ative'},
        {href: '#bh', title: 'Bevins-Heddens', c: 'nav-link'},
        {href: '#rt', title: 'Riley-Trombley', c: 'nav-link'},
    ]
</script>

<div class="container">
	<h5 class="card-title">Direct Ancestor Data Diagnostics</h5>
	<div class="card">
	<!-- Nav tabs -->
		<ul class="nav nav-tabs" role="tablist">
		{#each tabs as tab, i}
			<li class="nav-item">
				<a class={tab.c} data-bs-toggle="tab" href={tab.href}>{tab.title}</a>
			</li>
		{/each}
		</ul>

		<!-- Tab panes -->
		<div class="tab-content">
			<div id="gedcom" class="container tab-pane active"><br>
				<div class="card">
					<div class="card-body">
						<SylvanSummary sylvan={sylvan} />
					</div>
				</div>
			</div>

			<div id="bh" class="container tab-pane"><br>
				<div class="card">
					<div class="card-body">
						<Diagnostics ged={$ged} subjectNameKey='CollinDouglasBevins1952' prefix='BH'/>
					</div>
				</div>
			</div>

			<div id="rt" class="container tab-pane fade"><br>
				<div class="card">
					<div class="card-body">
						<Diagnostics ged={$ged} subjectNameKey='BarbaraJeanneRiley1953' prefix='RT'/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
