/**
 * Creates an SVG lineage diagram in the style of a railroad route map.
 * @param {} subject Reference to a Sylvan Person who is root of the Channels
 * @param {} settings Object with following settings properties:
 *  - scale Scale passed to posterLayout(), larger numbers create smaller page size
 *     scale === 1 produces a 36" wide poster, and
 *     scale === 4.2353 produces an 8.5" wide page.
 *  - guides If TRUE, 1" ruler guides are displayed across the entire poster
 *  - lowerTimeline: World_History,
 *  - upperTimeline: US_History
 *  - sheetNumber: 0
 * @returns SVG lineage diagram in the style of a railroad route map.
 */

// Gxml and PosterSVG library packages to be used 'as-is'
import { gxmlStr } from '../Gxml/index.js'
import { flagDefsGxml, footerGxml, guidesGxml } from '../PosterSvg/index.js'

// Sylvan-specific packages for content
import { Channels } from '../Sylvan/class/Channels.js'
import { SheetDefs } from './sheetDefs.js'
import { layoutSpecPortraitPoster, imageLayout, posterLayout } from './index.js'
import { borderGxml, contentGxml, coverGxml, headerGxml, posterGxml, trainNodeGeom } from './index.js'
import { logGeom } from './trainNodeGeom.js'

export function lineageTrainPosterSvg(subject, settings) {

    //--------------------------------------------------------------------------
    // Step 1 - select desired portrait layout specification (inches)
    //--------------------------------------------------------------------------
    
    const layoutSpec = layoutSpecPortraitPoster()
    layoutSpec.coverHt = 11

    //--------------------------------------------------------------------------
    // Step 2 - create some Gxml content to embed in the portrait layout
    //--------------------------------------------------------------------------

    // Get Channels structure for this subject and select the display branch
    const channels = new Channels(subject, true)
    const nodes = channels.nodesBySeq()

    // getSheetNodes() returns a *CLONED* sheetDef with:
    // a 'sheet.nodes' property containing CLONED nodes,
    // a 'sheet.startNode' property referencing the starting CLONED node, and
    // a 'sheet.channels' property
    // const sheet = channels.getSheetNodes(SheetDefs[settings.sheetNumber])
    const sheet = SheetDefs[settings.sheetNumber]

    // Set the content geometry for the node range of years and channels
    // const geom = trainNodeGeom(sheet.nodes, settings.scale)
    const geom = trainNodeGeom(nodes, settings.scale)
    // logGeom(geom)
    const contentEls = contentGxml(channels, geom.nodes, geom, settings)

    //--------------------------------------------------------------------------
    // Step 3 - get a completed portrait layout (in SVG units)
    //--------------------------------------------------------------------------

    const layout = settings.poster
        ? posterLayout(layoutSpec, geom.width, geom.height, settings.scale, settings.portrait)
        : imageLayout(layoutSpec, geom.width, geom.height, settings.scale, settings.portrait)

    //--------------------------------------------------------------------------
    // Step 4 - get the poster Gxml with embedded content Gxml
    //--------------------------------------------------------------------------
    
    const flagDefsEls = flagDefsGxml()
    const coverEls = settings.poster ? coverGxml(layout, geom) : []
    const guidesEls = settings.guides ? guidesGxml(layout) : []
    const borderEls = settings.poster ? borderGxml(layout) : []
    const footerEls = settings.poster ? footerGxml(layout) : []
    const headerEls = settings.poster ? headerGxml(layout, settings.scale,
        nodes[0].label, `${nodes.length} Ancestors`) : []
    const gxml = posterGxml(layout, contentEls, flagDefsEls,
            borderEls, headerEls, footerEls, coverEls, guidesEls)

    //--------------------------------------------------------------------------
    // Step 5 - convert the gxml elements into SVG
    //--------------------------------------------------------------------------
    
    const svg = gxmlStr(gxml)

    //--------------------------------------------------------------------------
    // Step 6 - save or display the generated SVG
    //--------------------------------------------------------------------------
    
    return svg
}
