/**
 * Creates an SVG lineage diagram in the style of a railroad route map.
 */
import { gxmlStr } from '../Gxml/index.js'
import { layoutSpecPortraitPoster, portraitLayout } from '../PosterSvg/index.js'
import { borderGxml, footerGxml, guidesGxml } from '../PosterSvg/index.js'

// Sylvan content
import { Channels } from '../Sylvan/class/Channels.js'
import { flagDefsGxml } from './flagDefsGxml.js'
import { headerGxml } from './headerGxml.js'
import { posterGxml } from './posterGxml.js'
import { trackNamesGxml } from './tracknamesGxml.js'
import { trainGeometry } from './trainGeometry.js'
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
 * Creates an SVG lineage diagram in the style of a railroad route map.
 * @param {} subject Reference to a Sylvan Person who is root of the Channels
 * @param {*} scale 
 * @param {*} guides If TRUE, 1" ruler guides are displayed
 * @returns SVG lineage diagram in the style of a railroad route map.
 */
export function lineageTrainPosterSvg(subject, scale=1, guides=false) {
    // Step 1 - create some Gxml content to embed in the portrait layout
    const channels = getChannels(subject)
    const geom = trainGeometry(channels)

    // const gridEls = gridGxml(geom)
    const preambleEls = flagDefsGxml()
    const trainStationsEls = trainStationsGxml(geom)
    const trainTracksEls = trainTracksGxml(geom)
    const trackNamesEls = trackNamesGxml(geom)
    const contentEls = [...trainTracksEls, ...trainStationsEls, ...trackNamesEls]

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
    const gxml = posterGxml(layout, contentEls, preambleEls, borderEls, headerEls, footerEls, guidesEls)

    // Step 5 - convert the gxml elements into SVG
    const svg = gxmlStr(gxml)

    // Step 6 - save or display the generated SVG
    return svg
}
