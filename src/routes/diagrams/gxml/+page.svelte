<script>
    import LineageTrainPosterSvg from '$lib/LineageTrainPosterSvg/LineageTrainPosterSvg.svelte'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    $: scale = 4.25
    $: guides = true
</script>

<LineageTrainPosterSvg {scale} {guides} subjectNameKey={$subjectNameKey} />