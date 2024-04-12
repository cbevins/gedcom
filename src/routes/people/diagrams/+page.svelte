<script>
    import SylvanSvgBirthDots from '$lib/Sylvan/svelte/SylvanSvgBirthDots.svelte'
    import Scale from '$lib/Sylvan/svg/Scale.svelte'
    import Vines from '$lib/Sylvan/svelte/Vines.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
</script>

<SylvanSvgBirthDots sylvan={getSylvan()} subjectNameKey={$subjectNameKey} />

<Vines sylvan={getSylvan()} subjectNameKey={$subjectNameKey} />
<!-- <Scale /> -->