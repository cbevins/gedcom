/**
 * Demonstrates composition of Gxml and SVG content that is subsequently
 * given as content to a printable SVG with a portrait layout.
 */
export function gridGxml(geom) { // width=1000, height=2000) {
    const els = []
    for(let col=0; col<geom.cols; col++) {
        els.push({el: 'line', id: `grid-col-${col}`,
            x1: col*geom.colWd,
            y1: 0,
            x2: col*geom.colWd,
            y2: geom.height,
            stroke: 'black', 'stroke-width': 1})
    }
    for(let row=0; row<geom.rows; row++) {
        els.push({el: 'line', id: `grid-row-line-${row}`,
            x1: 0,
            y1: row*geom.rowHt,
            x2: geom.width,
            y2: row*geom.rowHt,
            stroke: 'black', 'stroke-width': 1})
    }

    for(let col=0; col<geom.cols; col++) {
        const year = geom.yearMin + col * geom.yearsPerCol
        const x = geom.yearX(year)
        for(let row=0; row<geom.rows; row++) {
            const chan = row
            const y = geom.chanY(chan)
            els.push({el: 'text', x: x, y: y,
                'text-anchor': 'middle',
                'font-family': 'sans-serif',
                'font-size': 24,
                'font-weight':"lighter",
                stroke: 'none',
                'stroke-width': 0,
                fill: 'black',
                els: [{el: 'inner', content: `${chan},${year}`}]
            })
        }
    }

    els.push({el: 'rect', id: 'grid-rect',
        x: 0, y: 0, width: geom.width, height: geom.height,
        stroke: 'black', 'stroke-width': 1, fill: 'none', els: []})
    return els
}
