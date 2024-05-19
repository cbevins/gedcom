<script>
    export let scale = 1
    export let guides = false
    export let subjectNameKey
    export let sheetNumber = 0

    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { lineageTrainPosterSvg } from '$lib/LineageTrainPosterSvg/lineageTrainPosterSvg.js'

    function html (subjectNameKey, sheetNumber, scale=1, guides=false) {
        const subject = getSylvan().people().find(subjectNameKey)
        const svg = lineageTrainPosterSvg(subject, sheetNumber, scale, guides)
        return svg
    }
</script>

{@html html(subjectNameKey, sheetNumber, scale, guides)}
