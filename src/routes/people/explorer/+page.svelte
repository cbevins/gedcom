<script>
    import Settings from '$lib/Sylvan/svelte/SettingsOffcanvas/Settings.svelte'
    import SubjectSelector from '$lib/Sylvan/svelte/SettingsOffcanvas/SubjectSelector.svelte'
	import SylvanAncestors from '$lib/Sylvan/svelte/SylvanAncestors.svelte'
	import SylvanDemographics from '$lib/Sylvan/svelte/SylvanDemographics.svelte'
	import SylvanGenerations from '$lib/Sylvan/svelte/SylvanGenerations.svelte'
	import SylvanImmigrants from '$lib/Sylvan/svelte/SylvanImmigrants.svelte'
	import SylvanOrigins from '$lib/Sylvan/svelte/SylvanOrigins.svelte'
    import SylvanProfile from '$lib/Sylvan/svelte/SylvanProfile.svelte'

    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DEREFERENCE VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    
    // console.log('RUNNING src/routes/people/explorer')

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
        
        <!-- Nav tabs -->
        <ul class="nav nav-tabs" role="tablist">
            {#each tabs as tab, i}
                <li class="nav-item">
                    <a class={tab.c} data-bs-toggle="tab"
                        href={tab.href}>{tab.title}</a>
                </li>
            {/each}
        </ul>

        <Settings id="explorer" title="Settings">
            <SubjectSelector/>
        </Settings>

        <!-- Tab panes -->
        <div class="tab-content">
            <div id="family" class="container tab-pane active"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanProfile sylvan={getSylvan()} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="ancestors" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanAncestors sylvan={getSylvan()} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="immigrants" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanImmigrants sylvan={getSylvan()} bind:subjectNameKey={$subjectNameKey}/>
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
                        Under development
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
