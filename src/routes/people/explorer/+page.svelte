<script>
	import AncestorTree from '$lib/svelte/AncestorTree.svelte'
	import Profile from '$lib/svelte/Profile.svelte'
    import RootSelector from '$lib/svelte/RootSelector.svelte'
    import SubjectSelector from '$lib/svelte/SubjectSelector.svelte'
    import { ged, rootNameKey, subjectNameKey } from '$lib/js/store.js'
</script>
<h3>People Explorer</h3>
<div>
    Subject: {$subjectNameKey}
    <SubjectSelector />
</div>
<div>
    Root: {$rootNameKey}
    <RootSelector />
</div>

<div class="card">
    <div class="card-body">
        <Profile ged={$ged} bind:subjectNameKey={$subjectNameKey}/>
        <hr>
    </div>
</div>

<div class="card">
    <div class="card-body">
        <AncestorTree ged={$ged} bind:subjectNameKey={$subjectNameKey}/>
        <hr>
    </div>
</div>
