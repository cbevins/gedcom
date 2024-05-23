<script>
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { lineageTrainPosterSvg } from '$lib/LineageTrainPosterSvg/lineageTrainPosterSvg.js'

    export let subjectNameKey
    export let settings =  {
        guides: false,
        lowerTimeline: World_History,
        portrait: true,
        poster: true,
        scale: 1,
        sheetNumber: 0,
        upperTimeline: World_History
    }

    function html (subjectNameKey, settings) {
        const subject = getSylvan().people().find(subjectNameKey)
        const svg = lineageTrainPosterSvg(subject, settings)
        return svg
    }
</script>

{@html html(subjectNameKey, settings)}
