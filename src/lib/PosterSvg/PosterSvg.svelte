<script>
    export let width = 1000
    export let height = 2000
    export let scale = 1
    export let guides = false

    import { gxmlStr } from '$lib/Gxml/gxmlStr.js'
    import { borderGxml } from './borderGxml.js'
    import { footerGxml } from './footerGxml.js'
    import { guidesGxml } from './guidesGxml.js'
    import { headerGxml } from './headerGxml.js'
    import { posterGxml } from './posterGxml.js'
    import { layoutSpecPortraitPoster } from '$lib/Gxml/portraitLayoutSpecs.js'
    import { gridContentExampleGxml } from '$lib/Gxml/gridContentExampleGxml.js'
    import { portraitLayout } from '$lib/Gxml/portraitLayout.js'

    function html (w, h, guides) {
        // Step 1 - select desired portrait layout specification (inches)
        const layoutSpec = layoutSpecPortraitPoster()
        // console.log(layoutSpec)

        // Step 2 - create some Gxml content to embed in the portrait layout
        const contentGxml = gridContentExampleGxml(w, h)
        // console.log(gridEls)

        // Step 3 - get a completed portrait layout (in SVG units)
        const layout = portraitLayout(layoutSpec, w, h, scale)
        // console.log(layout)

        // Step 4 - get the poster Gxml with embedded content Gxml
        const borderEls = borderGxml(layout)
        const headerEls = headerGxml(layout, 'Bevins-Heddens Line Route', 'Running Since 1500')
        const footerEls = footerGxml(layout)
        const guidesEls = guides ? guidesGxml(layout) : []
        // console.log(guidesEls)
        const gxml = posterGxml(layout, contentGxml, borderEls, headerEls, footerEls, guidesEls)

        // Step 5 - convert the gxml elements into SVG
        const svg = gxmlStr(gxml, guidesEls)

        // Step 6 - save or display the generated SVG
        return svg
    }
</script>

{@html html(width, height, guides)}
