<script>
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { lineageChartPosterSvg } from './lineageChartPosterSvg.js'

    export let subjectNameKey
    export let settings =  {
        grid: false,
        guides: false,
        portrait: true,
        poster: true,
        scale: 1,
    }

    function html (subjectNameKey, settings) {
        const subject = getSylvan().people().find(subjectNameKey)
        const svg = lineageChartPosterSvg(subject, settings)
        return svg
    }
</script>

{@html html(subjectNameKey, settings)}
