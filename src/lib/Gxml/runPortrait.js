import { gxmlStr } from './gxmlStr.js'
import { portrait } from './portrait.js'
import { layoutStandardPortrait } from './commonLayouts.js'
import { gridContentExampleGxml } from './gridContentExampleGxml.js'

const gridSize = {width: 1000, height: 2000}
const gridEls = gridContentExampleGxml(gridSize.width, gridSize.height)
// console.log(gridEls)
const layout = layoutStandardPortrait(gridSize.width, gridSize.height)
// console.log(layout)

const svg = portrait(layout, gridEls)
console.log(gxmlStr(svg))
