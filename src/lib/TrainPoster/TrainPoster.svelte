<script>
    export let width = 1000
    export let height = 2000
    export let scale = 1
    export let guides = false
    export let subjectNameKey

    import { gxmlStr } from '$lib/Gxml/gxmlStr.js'
    import { layoutSpecPortraitPoster } from '$lib/Gxml/portraitLayoutSpecs.js'
    import { gridContentExampleGxml } from '$lib/Gxml/gridContentExampleGxml.js'
    import { portraitLayout } from '$lib/Gxml/portraitLayout.js'

    import { borderGxml } from '$lib/Poster/borderGxml.js'
    import { footerGxml } from '$lib/Poster/footerGxml.js'
    import { guidesGxml } from '$lib/Poster/guidesGxml.js'
    import { headerGxml } from '$lib/Poster/headerGxml.js'
    import { posterGxml } from '$lib/Poster/posterGxml.js'

    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { Channels } from '$lib/Sylvan/class/Channels.js'

    import { trainGeom } from './trainGeom.js'
    import { trainTracksGxml } from './trainTracksGxml.js'

    //--------------------------------------------------------------------
    // Step 1: Determine content and its dimensions
    //--------------------------------------------------------------------
    const upi = 100         // 100 SVG units per inch
    
    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    $: subject = getSylvan().people().find(subjectNameKey)
    $: channels = getChannels(subject)
    $: geom = trainGeom(channels, 3500, upi, scale)
    $: console.log('geom.totalHt', geom.totalHt)   

    function getChannels(subj) {
        const c = new Channels(subj)
        // Move subject to a channel midway between father and mother
        const r = c.rootNode()
        const f = c.father ? c.father.channel : 1
        const m = c.mother ? c.mother.channel : c.channelMaxCount()
        r.channel = Math.trunc((f + m) / 2)
        return c
    }

    function html (w, h, guides) {
        // Step 1 - select desired portrait layout specification (inches)
        const layoutSpec = layoutSpecPortraitPoster()
        // console.log(layoutSpec)

        // Step 2 - create some Gxml content to embed in the portrait layout
        const contentGxml = gridContentExampleGxml(w, h)
        // console.log(gridEls)
        const tracksGxml = trainTracksGxml(channels, geom)
        console.log(tracksGxml)

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
