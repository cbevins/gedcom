/**
 * Creates an SVG lineage diagram in the style of a railroad route map.
 */

// Library packages to be used 'as-is'
import { gxmlStr } from '../Gxml/index.js'
import { layoutSpecPortraitPoster, portraitLayout } from '../PosterSvg/index.js'
import { borderGxml, flagDefsGxml, footerGxml, guidesGxml, posterGxml } from '../PosterSvg/index.js'

// Sylvan-specific packages for content
import { Channels } from '../Sylvan/class/Channels.js'
import { contentGxml } from './contentGxml.js'
import { headerGxml } from './headerGxml.js'
import { trainGeometry } from './trainGeometry.js'

// TO DO - Update this to select specific and/or shortened branches
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
 * @param {*} scale Scale passed to portraitLayout(), larger numbers create smaller page size
 *     scale === 1 produces a 36" wide poster, and
 *     scale === 4.2353 produces an 8.5" wide page.
 * @param {*} guides If TRUE, 1" ruler guides are displayed across the entire poster
 * @returns SVG lineage diagram in the style of a railroad route map.
 */
export function lineageTrainPosterSvg(subject, scale=1, guides=false) {
    // Step 1 - select desired portrait layout specification (inches)
    const layoutSpec = layoutSpecPortraitPoster()

    // Step 2 - create some Gxml content to embed in the portrait layout
    const channels = getChannels(subject)
    const geom = trainGeometry(channels)
    const contentEls = contentGxml(geom)

    // Step 3 - get a completed portrait layout (in SVG units)
    const layout = portraitLayout(layoutSpec, geom.width, geom.height, scale)

    // Step 4 - get the poster Gxml with embedded content Gxml
    const borderEls = borderGxml(layout)
    const headerEls = headerGxml(layout,
        'Bevins-Heddens Line Route',
        'Running Since 1500')
    const footerEls = footerGxml(layout)
    const guidesEls = guides ? guidesGxml(layout) : []
    const flagDefsEls = flagDefsGxml()
    const gxml = posterGxml(layout,
        contentEls,
        flagDefsEls,
        borderEls,
        headerEls,
        footerEls,
        guidesEls)

    // Step 5 - convert the gxml elements into SVG
    const svg = gxmlStr(gxml)

    // Step 6 - save or display the generated SVG
    return svg
}
