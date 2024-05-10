/**
 * Demonstrates using Gxml to compose an SVG diagram in portrait poster format.
 * For this example, the poster content is just a grid of 10 columns and 20 rows.
 */
import { gxmlStr } from '../Gxml/index.js'
import { borderGxml } from './borderGxml.js'
import { contentGxml } from './contentGxml.js'
import { flagDefsGxml } from './flagDefsGxml.js'
import { footerGxml } from './footerGxml.js'
import { guidesGxml } from './guidesGxml.js'
import { headerGxml } from './headerGxml.js'
import { posterGxml } from './posterGxml.js'
import { layoutSpecPortraitPoster } from './portraitLayoutSpecs.js'
import { portraitLayout } from './portraitLayout.js'

export function posterSvg(svgWidth=1000, svgHeight=2000, scale=1, guides=false) {
    // Step 1 - select desired portrait layout specification (inches)
    const layoutSpec = layoutSpecPortraitPoster()

    // Step 2 - create some Gxml content to embed in the portrait layout
    const contentEls = contentGxml(svgWidth, svgHeight)

    // Step 3 - get a completed portrait layout (in SVG units)
    const layout = portraitLayout(layoutSpec, svgWidth, svgHeight, scale)

    // Step 4 - get the poster Gxml with embedded content Gxml
    const borderEls = borderGxml(layout)
    const headerEls = headerGxml(layout,
            'Sample Poster in Portrait Format',
            'The Poster Height Varies to Accommodate The Content Height')
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

    // Step 6 - return the generated SVG
    return svg
}
