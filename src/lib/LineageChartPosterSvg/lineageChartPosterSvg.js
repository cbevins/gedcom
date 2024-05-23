/**
 * Creates an SVG lineage diagram in the style of a generational chart.
 * @param {} subject Reference to a Sylvan Person who is root of the Channels
 * @param {} settings Object with following settings properties:
 *  - scale Scale passed to portraitLayout(), larger numbers create smaller page size
 *     scale === 1 produces a 36" wide poster, and
 *     scale === 4.2353 produces an 8.5" wide page.
 *  - guides If TRUE, 1" ruler guides are displayed across the entire poster
 * @returns SVG lineage diagram in the style of a generational chart.
 */

// Gxml and PosterSVG library packages to be used 'as-is'
import { gxmlStr } from '$lib/Gxml/index.js'
import { layoutSpecPortraitPoster, imageLayout, portraitLayout } from '../PosterSvg/index.js'
import { flagDefsGxml, guidesGxml, posterGxml } from '../PosterSvg/index.js'

// Sylvan-specific packages for content
import { Lineage } from '../Sylvan/class/Lineage.js'
import { borderGxml, contentGxml, footerGxml, geometry, headerGxml } from './index.js'

export function lineageChartPosterSvg(subject, settings) {

    //--------------------------------------------------------------------------
    // Step 1 - select desired portrait layout specification (inches)
    //--------------------------------------------------------------------------
    
    const layoutSpec = layoutSpecPortraitPoster()

    //--------------------------------------------------------------------------
    // Step 2 - create some Gxml content to embed in the portrait layout
    //--------------------------------------------------------------------------

    const lineage = new Lineage(subject)
    const geom = geometry(lineage, settings)
    const contentEls = contentGxml(geom, settings)
    // console.log(`Generational Chart is ${geom.width} x ${geom.height} (${geom.grid.cols} cols by ${geom.grid.rows} rows)`)
    const nodes = geom.lineage.nodesBySeq()

    //--------------------------------------------------------------------------
    // Step 3 - get a completed portrait layout (in SVG units)
    //--------------------------------------------------------------------------
    
    const layout = settings.poster
        ? portraitLayout(layoutSpec, geom.width, geom.height, settings.scale, settings.portrait)
        : imageLayout(layoutSpec, geom.width, geom.height, settings.scale, settings.portrait)

    //--------------------------------------------------------------------------
    // Step 4 - get the poster Gxml with embedded content Gxml
    //--------------------------------------------------------------------------
    
    const flagDefsEls = flagDefsGxml()
    const guidesEls = settings.guides ? guidesGxml(layout) : []
    const borderEls = settings.poster ? borderGxml(layout) : []
    const footerEls = settings.poster ? footerGxml(layout) : []
    const headerEls = settings.poster ? headerGxml(layout, settings.scale,
        nodes[0].person.label(), `${nodes.length} Ancestors`) : []
    const gxml = posterGxml(layout, contentEls, flagDefsEls,
            borderEls, headerEls, footerEls, guidesEls)

    //--------------------------------------------------------------------------
    // Step 5 - convert the gxml elements into SVG
    //--------------------------------------------------------------------------
    
    const svg = gxmlStr(gxml)

    //--------------------------------------------------------------------------
    // Step 6 - save or display the generated SVG
    //--------------------------------------------------------------------------
    
    return svg
}
