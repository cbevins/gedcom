<script>
	import AncestorTree from '$lib/svelte/AncestorTree.svelte'
	import Immigrants from '$lib/svelte/Immigrants.svelte'
	import Profile from '$lib/svelte/Profile.svelte'
    import RootSelector from '$lib/svelte/RootSelector.svelte'
    import SubjectSelector from '$lib/svelte/SubjectSelector.svelte'
    import { ged, rootNameKey, subjectNameKey } from '$lib/js/store.js'
</script>
<h3>People Explorer</h3>
<div class="card">
    <div>
        Subject: {$subjectNameKey}
        <SubjectSelector />
    </div>
    <div>
        Root: {$rootNameKey}
        <RootSelector />
    </div>
</div>

<div class="card">
<!-- Nav tabs -->
<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" data-bs-toggle="tab"
            href="#family">Family Groups</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab"
            href="#ancestors">Ancestors</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" data-bs-toggle="tab"
            href="#immigrants">Immigrant Ancestors</a>
    </li>
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
</div>
</div>
