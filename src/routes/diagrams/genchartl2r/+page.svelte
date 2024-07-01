<script>
    import Chart from '$lib/Sylvan/svelte/GenChartV2/Chart.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { genChartAnodes } from './genChartAnodes.js'
    // BE SURE TO DE-REFERENCE THE STORE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    $: subject = getSylvan().people().find($subjectNameKey)
    $: genData = init(subject)
    console.log('RUNNING src/routes/diagrams/genchartl2r')
    function init(person) { return genChartAnodes(person) }
</script>
<h3>Generational Chart V2 (L2R) for {subject.label()}</h3>
<Chart sylvan={getSylvan()} {subject} {genData} />