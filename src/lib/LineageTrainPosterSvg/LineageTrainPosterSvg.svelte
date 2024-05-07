<script>
    export let scale = 1
    export let guides = false
    export let subjectNameKey

    import { gxmlStr } from '$lib/Gxml/index.js'
    import { layoutSpecPortraitPoster, portraitLayout } from '$lib/PosterSvg/index.js'
    import { borderGxml, footerGxml, guidesGxml, headerGxml, posterGxml } from '$lib/PosterSvg/index.js'
    
    
    // SYlvan content
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { Channels } from '$lib/Sylvan/class/Channels.js'
    import { trainGeometry } from './trainGeometry.js'
    import { gridGxml } from './gridGxml.js'
    import { trackNamesGxml } from './tracknamesGxml.js'
    import { trainStationsGxml } from './trainStationsGxml.js'
    import { trainTracksGxml } from './trainTracksGxml.js'

    //--------------------------------------------------------------------
    // Step 1: Determine content and its dimensions
    //--------------------------------------------------------------------

    function getChannels(subj) {
        const c = new Channels(subj)
        // Move subject to a channel midway between father and mother
        const r = c.rootNode()
        const f = c.father ? c.father.channel : 1
        const m = c.mother ? c.mother.channel : c.channelMaxCount()
        r.channel = Math.trunc((f + m) / 2)
        return c
    }

    function html (subjectNameKey, guides) {
        // Step 1 - create some Gxml content to embed in the portrait layout
        const subject = getSylvan().people().find(subjectNameKey)
        const channels = getChannels(subject)
        const geom = trainGeometry(channels)

        // const gridEls = gridGxml(geom)
        const trainStationsEls = trainStationsGxml(geom)
        const trainTracksEls = trainTracksGxml(geom)
        const trackNamesEls = trackNamesGxml(geom)
        const contentEls = [...trainTracksEls, ...trainStationsEls, ...trackNamesEls]
        console.log(trackNamesEls[0])
        // Step 2 - select desired portrait layout specification (inches)
        const layoutSpec = layoutSpecPortraitPoster()
        // console.log(layoutSpec)

        // Step 3 - get a completed portrait layout (in SVG units)
        const layout = portraitLayout(layoutSpec, geom.width, geom.height, scale)
        // console.log(layout)

        // Step 4 - get the poster Gxml with embedded content Gxml
        const borderEls = borderGxml(layout)
        const headerEls = headerGxml(layout, 'Bevins-Heddens Line Route', 'Running Since 1500')
        const footerEls = footerGxml(layout)
        const guidesEls = guides ? guidesGxml(layout) : []
        const gxml = posterGxml(layout, contentEls, borderEls, headerEls, footerEls, guidesEls)

        // Step 5 - convert the gxml elements into SVG
        const svg = gxmlStr(gxml)

        // Step 6 - save or display the generated SVG
        return svg
    }
</script>

{@html html(subjectNameKey, guides)}
