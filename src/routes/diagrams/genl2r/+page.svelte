<script>
    import Vines from '$lib/Sylvan/svelte/Vines.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    $: label = getSylvan().people().find($subjectNameKey).label()
</script>
<h3>Generational Chart for {label}</h3>
<Vines sylvan={getSylvan()} subjectNameKey={$subjectNameKey} />