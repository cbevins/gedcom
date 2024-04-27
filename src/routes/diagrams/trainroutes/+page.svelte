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

<TrainRoutes {channels} {factor} />
