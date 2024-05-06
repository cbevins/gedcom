/**
 * Demonstrates composition of Gxml and SVG content that is subsequently
 * given as content to a printable SVG with a portrait layout.
 * 
 * @param {} width Grid width in SVG units
 * @param {*} height Grid height in SVG units
 * @returns 
 */
export function gridContentExampleGxml(width=1000, height=2000) {
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
                y: row*rowHt + rowHt/2 + 12,
                'text-anchor': 'middle',
                'font-family': 'sans-serif',
                'font-size': 36,
                'font-weight':"lighter",
                stroke: 'none',
                'stroke-width': 0,
                fill: 'black',
                els: [{el: 'inner', content: `${col},${row}`, els: []}]
            })
        }
    }

    els.push({el: 'rect', id: 'grid-rect', x: 0, y: 0, width: width, height: height,
        stroke: 'black', 'stroke-width': 1, fill: 'none', els: []})
    return els
}
