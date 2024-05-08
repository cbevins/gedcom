<script>
    export let scale = 1
    export let guides = false
    export let subjectNameKey

    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { lineageTrainPosterSvg } from '$lib/LineageTrainPosterSvg/lineageTrainPosterSvg.js'

    function html (subjectNameKey, guides) {
        const subject = getSylvan().people().find(subjectNameKey)
        const svg = lineageTrainPosterSvg(subject, scale, guides)
        return svg
    }
</script>

{@html html(subjectNameKey, scale, guides)}
