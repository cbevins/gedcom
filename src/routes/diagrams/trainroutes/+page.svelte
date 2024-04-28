<script>
    /**
     * This +page.svelte simply marshalls the Channels Lineage structure
     * and passes it on to Svg.svelte for sizing and drawing.
    */
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    import { Channels } from '$lib/Sylvan/class/Channels.js'
    import TrainRoutes from './TrainRoutes.svelte'

    // Factor may be set by some browser element, so capture it here
    $: factor = 1

    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    $: subject = getSylvan().people().find($subjectNameKey)
    $: channels = new Channels(subject)
</script>

Scale Factor:  {factor} <input type="range" bind:value={factor} min="0.25" max="5" step="0.25"/>

<TrainRoutes {channels} {factor} />
