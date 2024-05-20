<script>
	import SylvanAncestors from '$lib/Sylvan/svelte/SylvanAncestors.svelte'
	import SylvanDemographics from '$lib/Sylvan/svelte/SylvanDemographics.svelte'
	import SylvanGenerations from '$lib/Sylvan/svelte/SylvanGenerations.svelte'
	import SylvanImmigrants from '$lib/Sylvan/svelte/SylvanImmigrants.svelte'
	import SylvanOrigins from '$lib/Sylvan/svelte/SylvanOrigins.svelte'
    import SylvanProfile from '$lib/Sylvan/svelte/SylvanProfile.svelte'
    import SylvanSubjectSelector from '$lib/Sylvan/svelte/SylvanSubjectSelector.svelte'

    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DEREFERENCE VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    // export let data // contain getSylvan() loaded and passed here by ./+page.js:load()

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

<div class="offcanvas offcanvas-end text-bg-dark" id="subject-settings">
    <div class="offcanvas-header">
        <h3 class="offcanvas-title">Settings</h3>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
    </div>
    <hr/>
    <div class="offcanvas-body">
        <div class="row">
            <h5>Subject</h5>
            <SylvanSubjectSelector sylvan={getSylvan()}/>
        </div>
    <hr/>
    </div>
</div>

<div class="card">
    <div class="card-body">
        <h5 class="card-title">People Explorer: {$subjectNameKey}
            <button class="btn btn-primary" type="button"
                data-bs-toggle="offcanvas" data-bs-target="#subject-settings">
            Change Subject
            </button>
            </h5>
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
