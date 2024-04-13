<script>
    import { onMount } from 'svelte'
    import SylvanSvgBirthDots from '$lib/Sylvan/svelte/SylvanSvgBirthDots.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    $: label = getSylvan().people().find($subjectNameKey).label()

    onMount(() => {
        window.scrollTo(1000, 1000)
    })
</script>

<h3>Ancestral Year-of-Birth for {label}</h3>
<SylvanSvgBirthDots sylvan={getSylvan()} subjectNameKey={$subjectNameKey} />