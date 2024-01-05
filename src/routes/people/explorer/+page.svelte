<script>
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
    Root: {$rootNameKey} <RootSelector />
</div>