<script>
    export let scale = 1
    export let guides = false
    export let subjectNameKey

    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { lineageTrainPosterSvg } from '$lib/LineageTrainPosterSvg/lineageTrainPosterSvg.js'
    $: sylvan = getSylvan()
    $: people = sylvan.people()
    $: sub = people.find(subjectNameKey)
    
    function html (subjectNameKey, scale=1, guides=false) {
        const subject = getSylvan().people().find(subjectNameKey)
        const svg = lineageTrainPosterSvg(subject, scale, guides)
        return svg
    }
</script>

{@html html(subjectNameKey, scale, guides)}
