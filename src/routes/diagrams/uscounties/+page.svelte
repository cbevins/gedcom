<script>
    import GB from '$lib/data/maps/edited/gb.svg'
    import US from '$lib/data/maps/counties/Usa_counties_large.svg'
    import { gxmlStr } from '$lib/Gxml/index.js'

    export let href = US

    function html(href) {
        const map = {el: 'image', x: 0, y: 0, href: href,
            // opacity: 0.3,
            preserveAspectRation: 'xMidYMid',   // 'xMidYMid', 'meet' or 'slice'
        }
        const els = [{el: 'svg', x: 0, y: 0, width: 1000, height: 1000, els: [map]}]
        const svg = gxmlStr(els)
        return svg
    }
</script>

<h5>US Counties</h5>
{@html html(href)}
<h5>Done</h5>
