<script>
	import SylvanOrigins from '$lib/Sylvan/svelte/SylvanOrigins.svelte'
	import Profile from '$lib/svelte/Profile.svelte'
    import RootSelector from '$lib/svelte/RootSelector.svelte'
	import SylvanAncestors from '$lib/Sylvan/svelte/SylvanAncestors.svelte'
	import SylvanDemographics from '$lib/Sylvan/svelte/SylvanDemographics.svelte'
	import SylvanGenerations from '$lib/Sylvan/svelte/SylvanGenerations.svelte'
	import SylvanImmigrants from '$lib/Sylvan/svelte/SylvanImmigrants.svelte'
    import SylvanSubjectSelector from '$lib/Sylvan/svelte/SylvanSubjectSelector.svelte'
    import { ged, rootNameKey, subjectNameKey } from '$lib/js/store.js'
	import { getSylvan } from '$lib/Sylvan/js/singletons.js'

	const sylvan = getSylvan()

    const tabs = [
        {href: '#family', title: 'Family Groups', c: 'nav-link active'},
        {href: '#ancestors', title: 'Ancestors', c: 'nav-link'},
        {href: '#immigrants', title: 'Immigrants', c: 'nav-link'},
        {href: '#origins', title: 'Origins', c: 'nav-link'},
        {href: '#migration', title: 'Migration Routes', c: 'nav-link'},
        {href: '#demographics', title: 'Demographics', c: 'nav-link'},
        {href: '#relationships', title: 'Relationships', c: 'nav-link'},
    ]
</script>

<div class="card">
    <div class="card-body">
        <h5 class="card-title">People Explorer</h5>
        <div class="card">
            <div>
                SYLVAN Subject: {$subjectNameKey}
                <SylvanSubjectSelector sylvan={sylvan} />
            </div>
            <!-- <div>
                Root: {$rootNameKey}
                <RootSelector />
            </div> -->
        </div>
        <hr>
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            {#each tabs as tab, i}
                <li class="nav-item">
                    <a class={tab.c} data-bs-toggle="tab"
                        href={tab.href}>{tab.title}</a>
                </li>
            {/each}
        </ul>

        <!-- Tab panes -->
        <div class="tab-content">
            <div id="family" class="container tab-pane active"><br>
                <div class="card">
                    <div class="card-body">
                        <Profile ged={$ged} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="ancestors" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanAncestors sylvan={sylvan} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="immigrants" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanImmigrants sylvan={sylvan} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="origins" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanOrigins sylvan={getSylvan()} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="migration" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <h3>{$subjectNameKey} Ancestral Migration Routes</h3>
                        <SylvanGenerations sylvan={getSylvan()} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="demographics" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanDemographics sylvan={getSylvan()} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="relationships" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <h3>{$subjectNameKey} Relationships</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
