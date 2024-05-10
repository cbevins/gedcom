import { gxmlStr } from '$lib/Gxml/index.js'
import { layoutSpecPortraitPoster, portraitLayout } from '$lib/PosterSvg/index.js'
import { borderGxml, footerGxml, guidesGxml, posterGxml } from '$lib/PosterSvg/index.js'

// Sylvan content
import { Channels } from '$lib/Sylvan/class/Channels.js'
import { trainGeometry } from './trainGeometry.js'
// import { gridGxml } from './gridGxml.js'
import { headerGxml } from './headerGxml.js'
import { trackNamesGxml } from './tracknamesGxml.js'
import { trainStationsGxml } from './trainStationsGxml.js'
import { trainTracksGxml } from './trainTracksGxml.js'

function getChannels(subj) {
    const chan = new Channels(subj)
    // Move subject to a channel midway between father and mother
    const root = chan.rootNode()
    const f = chan.father ? chan.father.channel : 1
    const m = chan.mother ? chan.mother.channel : chan.channelMaxCount()
    root.channel = Math.trunc((f + m) / 2)
    return chan
}

/**
 * EXPERIMENTAL
 * @param {} subject Reference to a Sylvan Person who is root of the Channels
 * @param {*} scale 
 * @param {*} guides If TRUE, 1" ruler guides are displayed
 * @returns 
 */
export function composer2(subject, scale=1, guides=false) {
    // Step 1 - create some Gxml content to embed in the portrait layout
    const channels = getChannels(subject)
    const geom = trainGeometry(channels)

    // const gridSvg = gxmlStr(gridGxml(geom))
    const trainStationsSvg = gxmlStr(trainStationsGxml(geom))
    const trainTracksSvg = gxmlStr(trainTracksGxml(geom))
    const trackNamesSvg = gxmlStr(trackNamesGxml(geom))

    // Step 2 - select desired portrait layout specification (inches)
    const layoutSpec = layoutSpecPortraitPoster()
    // console.log(layoutSpec)

    // Step 3 - get a completed portrait layout (in SVG units)
    const layout = portraitLayout(layoutSpec, geom.width, geom.height, scale)
    // console.log(layout)

    // Step 4 - get the poster Gxml with embedded content Gxml
    const borderSvg = gxmlStr(borderGxml(layout))
    const headerSvg = gxmlStr(headerGxml(layout, 'Bevins-Heddens Line Route', 'Running Since 1500'))
    const footerSvg = gxmlStr(footerGxml(layout))
    const guidesSvg = guides ? gxmlStr(guidesGxml(layout)) : ''
    const gxml = posterGxml(layout, contentEls, borderEls, headerEls, footerEls, guidesEls)

    // Step 5 - convert the gxml elements into SVG
    const svg = gxmlStr(gxml)

    // Step 6 - save or display the generated SVG
    return svg
}
