<script>
    import Chart from '$lib/Sylvan/svelte/GenChartV2/Chart.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    $: label = getSylvan().people().find($subjectNameKey).label()
</script>
<h3>Generational Chart (L2R) for {label}</h3>
<Chart sylvan={getSylvan()} subjectNameKey={$subjectNameKey} />