import { gxmlStr } from './gxmlStr.js'
import { portraitGxml } from './portraitGxml.js'
import { layoutSpecPortrait } from './portraitLayoutSpecs.js'
import { gridContentExampleGxml } from './gridContentExampleGxml.js'
import { portraitLayout } from './portraitLayout.js'

const contentSvgWidth = 1000
const contentSvgHeight = 2000

// Step 1 - select desired portrait layout specification (inches)
const layoutSpec = layoutSpecPortrait()
// console.log(layoutSpec)

// Step 2 - create some Gxml content to embed in the portrait layout
const contentGxml = gridContentExampleGxml(contentSvgWidth, contentSvgHeight)
// console.log(gridEls)

// Step 3 - get a completed portrait layout (in SVG units)
const layout = portraitLayout(layoutSpec, contentSvgWidth, contentSvgHeight)
// console.log(layout)

// Step 4 - get the poster Gxml with embedded content Gxml
const gxml = portraitGxml(layout, contentGxml)

// Step 5 - convert the gxml elements into SVG
const svg = gxmlStr(gxml)

// Step 6 - save or display the generated SVG
console.log(svg)
