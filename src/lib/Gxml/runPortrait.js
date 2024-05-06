import { gxmlStr } from './gxmlStr.js'

const layout = {
    scale: 1,
    supi: 100,      // SVG units per inch
    sheet: {
        width: 36,
        pad: {t: 1, b: 1, l: 1, r: 1}
    },
    border: {thickness: 1},
    header: {height: 3},
    footer: {height: 1},
    left: {width: 2},
    right: {width: 2},
    content: {height: 24},
}
layout.content.width = layout.sheet.width - layout.sheet.pad.l - layout.sheet.pad.r
    - 2*layout.border.thickness - layout.left.width - layout.right.width

export function portrait(layout, contentEls) {
    const {sheet, border, header, footer, left, right, content} = layout
    const factor = layout.supi / layout.scale

    // Calculate content-dependent heights and widths (inches)
    left.height = content.height
    right.height = content.height
    border.height = header.height + content.height + footer.height + 2 * border.thickness
    sheet.height = border.height + sheet.pad.t + sheet.pad.b

    border.width = sheet.width - sheet.pad.l - sheet.pad.r
    header.width = border.width - 2 * border.thickness
    footer.width = header.width
    content.width = header.width - left.width - right.width

    const sheetRect = {el: 'rect', id: 'sheet-rect',
        x: 0, y: 0,
        width: factor * sheet.width,
        height: factor * sheet.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []}

    const borderRect = {el: 'rect', id: 'border-rect',
        x: factor * sheet.pad.l,
        y: factor * sheet.pad.t,
        width: factor * border.width,
        height: factor * border.height,
        stroke: 'blue', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const headerRect = {el: 'rect', id: 'header-rect',
        x: borderRect.x + factor * border.thickness,
        y: borderRect.y + factor * border.thickness,
        width: factor * header.width,
        height: factor * header.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const leftRect = {el: 'rect', id: 'left-rect',
        x: borderRect.x + factor * border.thickness,
        y: headerRect.y + headerRect.height,
        width: factor * left.width,
        height: factor * left.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const contentRect = {el: 'svg', id: 'content-svg',
        x: borderRect.x + factor * (border.thickness + left.width),
        y: headerRect.y + headerRect.height,
        width: factor * content.width,
        height: factor * content.height,
        stroke: 'green', 'stroke-width': 5, fill: 'none',
        els: [contentEls]
    }

    const footerRect = {el: 'rect', id: 'footer-rect',
        x: borderRect.x + factor * border.thickness,
        y: contentRect.y + contentRect.height,
        width: factor * footer.width,
        height: factor * footer.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const rightRect = {el: 'rect', id: 'right-rect',
        x: contentRect.x + contentRect.width,
        y: headerRect.y + headerRect.height,
        width: factor * right.width,
        height: factor * right.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const topSvg = {el: 'svg',  xmlns: "http://www.w3.org/2000/svg",
        width: factor * sheet.width,
        height: factor * sheet.height,
        els: [sheetRect, borderRect, headerRect, footerRect, leftRect, rightRect, contentRect]}

    return topSvg
}

function grid(width=1000, height=2000, scale=1) {
    const els = []
    const colWd = 100
    const rowHt = 100
    const cols = Math.trunc(width/colWd) + 1
    const rows = Math.trunc(height/rowHt) + 1
    for(let col=0; col<cols; col++) {
        els.push({el: 'line', id: `grid-col-line-${col}`,
            x1: col*colWd, y1: 0, x2: col*colWd, y2: height,
            stroke: 'black', 'stroke-width': 1, els: []})
    }
    for(let row=0; row<rows; row++) {
        els.push({el: 'line', id: `grid-row-line-${row}`,
            x1: 0, y1: row*rowHt, x2: width, y2: row*rowHt,
            stroke: 'black', 'stroke-width': 1, els: []})
    }
    for(let col=0; col<cols-1; col++) {
        for(let row=0; row<rows-1; row++) {
            els.push({el: 'text',
                x: col*colWd + colWd/2,
                y: row*rowHt + rowHt/2,
                els: [{el: 'inner', content: `${col},${row}`, els: []}]
            })
        }
    }

    els.push({el: 'rect', id: 'grid-rect', x: 0, y: 0, width: width, height: height,
        stroke: 'black', 'stroke-width': 1, fill: 'none', els: []})
    const g = {el: 'g', id: 'grid-g',
        transform: `scale(${scale}, ${scale})`, els: els}
    return g
}

// Scale content width to the portrait content width
const layoutWidthSupi =  layout.content.width * layout.supi / layout.scale
const gridSize = {width: 1000, height: 2000}
const gridScale = layoutWidthSupi / gridSize.width
// Adjust the sheet height accordingly to accomodate the content height
const contentHeightSupi = gridSize.height * gridScale
layout.content.height = layout.scale * contentHeightSupi / layout.supi

// console.log(`- Portrait content region width is ${layout.content.width} inches (${layoutWidthSupi} SVG units)`)
// console.log(`- Content SVG width of ${gridSize.width} SVG units is scaled by ${gridScale} to fill the ${layoutWidthSupi} portrait width SVG units`)
// console.log(`- Content SVG height of ${gridSize.height} thus scales to ${contentHeightSupi} portrait SVG units (${layout.content.height} inches)`)

const gridG = grid(gridSize.width, gridSize.height, gridScale)
const svg = portrait(layout, gridG)
console.log(gxmlStr(svg))
