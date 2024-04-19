<script>
    import SylvanSvgGenChart from '$lib/Sylvan/svelte/SylvanSvgGenChart.svelte'
    // import SylvanSvgGenChartL2R from '$lib/Sylvan/svelte/SylvanSvgGenChartL2R.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    $: label = getSylvan().people().find($subjectNameKey).label()
</script>
<h3>EXPERIMENTAL Generational Chart (L2R) for {label}</h3>
<SylvanSvgGenChart sylvan={getSylvan()} subjectNameKey={$subjectNameKey} />