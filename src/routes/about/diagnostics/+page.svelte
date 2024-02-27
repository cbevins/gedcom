<script>
	import { ged } from '$lib/js/store.js'
	import Diagnostics from '$lib/svelte/Diagnostics.svelte'
	
    const tabs = [
        {href: '#bh', title: 'Bevins-Heddens', c: 'nav-link active'},
        {href: '#rt', title: 'Riley-Trobley', c: 'nav-link'},
    ]
</script>

<div class="container">
	<!-- <div class="card">
		<div class="card-body"> -->
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
					<div id="bh" class="container tab-pane active"><br>
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
		<!-- </div>
	</div> -->
</div>
