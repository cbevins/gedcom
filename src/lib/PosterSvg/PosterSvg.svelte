<script>
    export let width = 1000
    export let height = 2000
    export let scale = 4.25
    export let guides = true

    import { posterSvg } from '$lib/PosterSvg/posterSvg.js'

    function html (w, h, s, g) { return posterSvg(w, h, s, g) }
</script>

{@html html(width, height, scale, guides)}
