<script>
    import GB from '$lib/data/maps/edited/gb.svg'
    import KY from '$lib/data/maps/edited/KY.svg'
    import MD from '$lib/data/maps/edited/MD.svg'
    import MN from '$lib/data/maps/edited/MN.svg'
    import US from '$lib/data/maps/edited/Usa_counties_large.svg'
    import { gxmlStr } from '$lib/Gxml/index.js'

    export let href = MD

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
