<script>
	import SylvanAncestors from '$lib/Sylvan/svelte/SylvanAncestors.svelte'
	import SylvanDemographics from '$lib/Sylvan/svelte/SylvanDemographics.svelte'
	import SylvanGenerations from '$lib/Sylvan/svelte/SylvanGenerations.svelte'
	import SylvanImmigrants from '$lib/Sylvan/svelte/SylvanImmigrants.svelte'
	import SylvanOrigins from '$lib/Sylvan/svelte/SylvanOrigins.svelte'
    import SylvanProfile from '$lib/Sylvan/svelte/SylvanProfile.svelte'
    import SylvanSubjectSelector from '$lib/Sylvan/svelte/SylvanSubjectSelector.svelte'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    export let data // contain data.sylvan loaded and passed here by ./+page.js:load()

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
                Subject: {$subjectNameKey}
                <SylvanSubjectSelector sylvan={data.sylvan}/>
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
                        <SylvanProfile sylvan={data.sylvan} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="ancestors" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanAncestors sylvan={data.sylvan} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="immigrants" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanImmigrants sylvan={data.sylvan} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="origins" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanOrigins sylvan={data.sylvan} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="migration" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <h3>{$subjectNameKey} Ancestral Migration Routes</h3>
                        <SylvanGenerations sylvan={data.sylvan} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="demographics" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">
                        <SylvanDemographics sylvan={data.sylvan} bind:subjectNameKey={$subjectNameKey}/>
                    </div>
                </div>
            </div>

            <div id="relationships" class="container tab-pane fade"><br>
                <div class="card">
                    <div class="card-body">

                        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
                        </svg>
                        Under development
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
