<script>
	import GedcomContexts from '$lib/Sylvan/svelte/GedcomContexts.svelte'
	import GedcomTopLevel from '$lib/Sylvan/svelte/GedcomTopLevel.svelte'
	import SylvanDiagnostics from '$lib/Sylvan/svelte/SylvanDiagnostics.svelte'
	import SylvanReview from '$lib/Sylvan/svelte/SylvanReview.svelte'
	import SylvanSummary from '$lib/Sylvan/svelte/SylvanSummary.svelte'

	export let data

    const tabs = [
        {href: '#gedcom', title: 'GEDCOM File', c: 'nav-link active'},
        {href: '#parents', title: 'Sylvan Review', c: 'nav-link'},
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

						<p></p>
						<div class="accordion" id="fileCard">
							<div class="accordion-item">
								<h1 class="accordion-header" id={"sylvan-summary-heading"}>
									<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#sylvan-summary-collapse"} aria-expanded="true" aria-controls={"sylvan-summary-collapse"}>
										<h3>Sylvian Record Summary</h3>
									</button>
								</h1>
								<div id={"sylvan-summary-collapse"} class="accordion-collapse collapse show" aria-labelledby={"sylvan-summary-siblings-heading"}>
									<div class="accordion-body">
										<SylvanSummary sylvan={data.sylvan} />
									</div>
								</div>
							</div>
						</div>

						<p></p>
						<div class="accordion" id="fileCard">
							<div class="accordion-item">
								<h1 class="accordion-header" id={"gedcom-toplevel-heading"}>
									<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#gedcom-toplevel-collapse"} aria-expanded="true" aria-controls={"gedcom-toplevel-collapse"}>
										<h3>GEDCOM Top Level Record Counts</h3>
									</button>
								</h1>
								<div id={"gedcom-toplevel-collapse"} class="accordion-collapse collapse" aria-labelledby={"gedcom-toplevel-heading"}>
									<div class="accordion-body">
										<GedcomTopLevel sylvan={data.sylvan} />
									</div>
								</div>
							</div>
						</div>

						<p></p>
						<div class="accordion" id="fileCard">
							<div class="accordion-item">
								<h1 class="accordion-header" id={"gedcom-contexts-heading"}>
									<button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#gedcom-contexts-collapse"} aria-expanded="true" aria-controls={"gedcom-contexts-collapse"}>
										<h3>GEDCOM File Record Context Counts</h3>
									</button>
								</h1>
								<div id={"gedcom-contexts-collapse"} class="accordion-collapse collapse" aria-labelledby={"gedcom-contexts-heading"}>
									<div class="accordion-body">
										<GedcomContexts sylvan={data.sylvan} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="parents" class="container tab-pane fade"><br>
				<SylvanReview sylvan={data.sylvan}/>
			</div>

			<div id="bh" class="container tab-pane fade"><br>
				<div class="card">
					<div class="card-body">
						<SylvanDiagnostics sylvan={data.sylvan} subjectNameKey='CollinDouglasBevins1952' prefix='BH'/>
					</div>
				</div>
			</div>

			<div id="rt" class="container tab-pane fade"><br>
				<div class="card">
					<div class="card-body">
						<SylvanDiagnostics sylvan={data.sylvan} subjectNameKey='BarbaraJeanneRiley1953' prefix='RT'/>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
