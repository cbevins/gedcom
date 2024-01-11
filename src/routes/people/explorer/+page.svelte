<script>
	import AncestorTree from '$lib/svelte/AncestorTree.svelte'
	import Demographics from '$lib/svelte/Demographics.svelte'
	import Immigrants from '$lib/svelte/Immigrants.svelte'
	import Origins from '$lib/svelte/Origins.svelte'
	import Profile from '$lib/svelte/Profile.svelte'
    import RootSelector from '$lib/svelte/RootSelector.svelte'
    import SubjectSelector from '$lib/svelte/SubjectSelector.svelte'
    import { ged, rootNameKey, subjectNameKey } from '$lib/js/store.js'

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
            <SubjectSelector />
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
                    <AncestorTree ged={$ged} bind:subjectNameKey={$subjectNameKey}/>
                </div>
            </div>
        </div>

        <div id="immigrants" class="container tab-pane fade"><br>
            <div class="card">
                <div class="card-body">
                    <Immigrants ged={$ged} bind:subjectNameKey={$subjectNameKey}/>
                </div>
            </div>
        </div>

        <div id="origins" class="container tab-pane fade"><br>
            <div class="card">
                <div class="card-body">
                    <Origins ged={$ged} bind:subjectNameKey={$subjectNameKey}/>
                </div>
            </div>
        </div>

        <div id="migration" class="container tab-pane fade"><br>
            <div class="card">
                <div class="card-body">
                    <h3>{$subjectNameKey} Ancestral Migration Routes</h3>
                </div>
            </div>
        </div>

        <div id="demographics" class="container tab-pane fade"><br>
            <div class="card">
                <div class="card-body">
                    <Demographics ged={$ged} bind:subjectNameKey={$subjectNameKey}/>
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
