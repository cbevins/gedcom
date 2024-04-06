<script>
    import FamilyTree from '$lib/Sylvan/svelte/FamilyTree.svelte'
    import Vines from '$lib/Sylvan/svelte/Vines.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
</script>

<Vines sylvan={getSylvan()} subjectNameKey={$subjectNameKey} />
<!-- <FamilyTree sylvan={getSylvan()} subjectNameKey={$subjectNameKey} /> -->