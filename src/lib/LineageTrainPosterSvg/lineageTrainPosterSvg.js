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
    //--------------------------------------------------------------------------
    // Step 1 - select desired portrait layout specification (inches)
    //--------------------------------------------------------------------------
    
    const layoutSpec = layoutSpecPortraitPoster()

    //--------------------------------------------------------------------------
    // Step 2 - create some Gxml content to embed in the portrait layout
    //--------------------------------------------------------------------------
    
    const channels = getChannels(subject)
    // ENTIRE LINEAGE FROM ROOT NODE
    // const nodes = channels.nodesBySeq()
    // Set the geometry for the range of years and channels
    // const geom = trainGeometry(channels.yearMin(), channels.yearMax(), 0, channels.channelMaxCount())
    
    // SELECTED BRANCH ABOVE ROOT NODE
    const nodes = channels.findBranchByNameKey('JosephBevins1762')
    let yearMin = 9999
    let yearMax = 0
    let chanMin = 9999
    let chanMax = 0
    let genMin = 9999
    let genMax = 0
    const genAllowMin = 0
    const genAllowMax = 20
    const displayNodes = []
    for (let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        if (node.gen >= genAllowMin && node.gen <= genAllowMax) {
            chanMax = Math.max(chanMax, node.channel)
            chanMin = Math.min(chanMin, node.channel)
            genMax = Math.max(genMax, node.gen)
            genMin = Math.min(genMin, node.gen)
            yearMax = Math.max(yearMax, node.birthYear)
            yearMin = Math.min(yearMin, node.birthYear)
            displayNodes.push(node)
        }
    }
    console.log('Branch from', displayNodes[0].person.fullName(),
        `has ${displayNodes.length} Persons; ${yearMax-yearMin+1} Birth years (${yearMin}-${yearMax}); `
        + `${chanMax-chanMin+1} Channels (${chanMin}-${chanMax}); `
        + `${genMax-genMin+1} Generations (${genMin}-${genMax}).`)
    // Set the geometry for the range of years and channels
    const geom = trainGeometry(yearMin, yearMax, chanMin, chanMax)
    console.log(`Display has ${displayNodes.length} Persons, `
        + `${geom.yearSpan} Years (${geom.yearMin}-${geom.yearMax}), ${geom.rows} Rows, `
        + `${geom.height} Height and ${geom.width} Width.`)

    const contentEls = contentGxml(displayNodes, geom)

    //--------------------------------------------------------------------------
    // Step 3 - get a completed portrait layout (in SVG units)
    //--------------------------------------------------------------------------
    
    const layout = portraitLayout(layoutSpec, geom.width, geom.height, scale)

    //--------------------------------------------------------------------------
    // Step 4 - get the poster Gxml with embedded content Gxml
    //--------------------------------------------------------------------------
    
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

    //--------------------------------------------------------------------------
    // Step 5 - convert the gxml elements into SVG
    //--------------------------------------------------------------------------
    
    const svg = gxmlStr(gxml)

    //--------------------------------------------------------------------------
    // Step 6 - save or display the generated SVG
    //--------------------------------------------------------------------------
    
    return svg
}
