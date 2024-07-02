<script>
    import { onMount } from 'svelte'
    import SylvanSvgBirthYearChart from '$lib/Sylvan/svelte/SylvanSvgBirthYearChart.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    // console.log('RUNNING src/routes/diagrams/yearchartl2r')
    
    $: label = getSylvan().people().find($subjectNameKey).label()

    onMount(() => {
        window.scrollTo(1000, 1000)
    })
</script>

<h3>Ancestral Birth Year Chart (L2R) for {label}</h3>
<SylvanSvgBirthYearChart sylvan={getSylvan()} subjectNameKey={$subjectNameKey} />