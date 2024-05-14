<script>
    import LineageTrainPosterSvg from '$lib/LineageTrainPosterSvg/LineageTrainPosterSvg.svelte'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    $: scale = 0.5
    $: guides = false
</script>

<LineageTrainPosterSvg {scale} {guides} subjectNameKey={$subjectNameKey} />
