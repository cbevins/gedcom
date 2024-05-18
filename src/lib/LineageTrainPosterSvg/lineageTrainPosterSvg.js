/**
 * Creates an SVG lineage diagram in the style of a railroad route map.
 */

// Library packages to be used 'as-is'
import { gxmlStr } from '../Gxml/index.js'
import { layoutSpecPortraitPoster, portraitLayout } from '../PosterSvg/index.js'
import { borderGxml, flagDefsGxml, footerGxml, guidesGxml, posterGxml } from '../PosterSvg/index.js'

// Sylvan-specific packages for content
import { SheetDefs } from './sheetDefs.js'
import { Channels } from '../Sylvan/class/Channels.js'
import { contentGxml } from './contentGxml.js'
import { headerGxml } from './headerGxml.js'
import { trainNodeGeom, logGeom } from './trainNodeGeom.js'

function findNodeByNameKey(nodes, nameKey) {
    for(let i=0; i<nodes.length; i++) {
        if (nodes[i].person.nameKey() === nameKey) return nodes[i]
    }
    return null
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
export function lineageTrainPosterSvg(subject, scale=1, guides=false ) {

    //--------------------------------------------------------------------------
    // Step 1 - select desired portrait layout specification (inches)
    //--------------------------------------------------------------------------
    
    const layoutSpec = layoutSpecPortraitPoster()

    //--------------------------------------------------------------------------
    // Step 2 - create some Gxml content to embed in the portrait layout
    //--------------------------------------------------------------------------

    // Get Channels structure for this subject and select the display branch
    const channels = new Channels(subject, false)
    const sheets = []
    for(let i=0; i<SheetDefs.length; i++) {
        // getSheetNodes() returns a *CLONED* sheetDef with:
        // a 'sheet.nodes' property containing CLONED nodes,
        // a 'sheet.startNode' property referencing the starting CLONED node, and
        // a 'sheet.channels' property
        sheets.push(channels.getSheetNodes(SheetDefs[i]))
    }
    const sheet = sheets[1]
    // Set the content geometry for the node range of years and channels
    const geom = trainNodeGeom(sheet.nodes, scale)
    logGeom(geom)
    const contentEls = contentGxml(geom.nodes, geom, scale)

    //--------------------------------------------------------------------------
    // Step 3 - get a completed portrait layout (in SVG units)
    //--------------------------------------------------------------------------
    
    const layout = portraitLayout(layoutSpec, geom.width, geom.height, scale)

    //--------------------------------------------------------------------------
    // Step 4 - get the poster Gxml with embedded content Gxml
    //--------------------------------------------------------------------------
    
    const borderEls = borderGxml(layout)
    const headerEls = headerGxml(layout, scale,
        sheet.name, `${sheet.nodes.length} Ancestors`)
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
