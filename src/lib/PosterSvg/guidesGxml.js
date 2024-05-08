/**
 * Returns an array of Gxml JSON objects defining a ruled overlay for the poster.
 * @param {layout} layout The layout rturned by portraitLayout()
 * @returns An array of Gxml JSON objects
 */

// Returns an array of y-coordinates for 0.25" vertical guide lines
function pos(units, supi=100, lpi=4) {
    const lines = (lpi * Math.trunc(units / supi))
    const upl = units / lines   // units per line
    const pos = []
    for(let i=0; i<=lines; i++) pos.push(i * upl)
    return pos
}

export function guidesGxml(layout) {
    const els = []
    const lpi = 4   // guide lines per inch
    const w = layout.sheet.width
    const h = layout.sheet.height
    const x = pos(w, layout.sheet.supi, lpi)
    const fontSize = 16
    for(let i=1; i<x.length; i++) {
        if (i%lpi) {
            els.push({el: 'line', x1: x[i], y1: 0, x2: x[i], y2: h,
                fill: 'none',
                stroke: 'grey',
                'stroke-dasharray': '10 10',
                'stroke-opacity': 0.5,
                'stroke-width': 1
            })
        } else {
            els.push({el: 'line', x1: x[i], y1: 0, x2: x[i], y2: h,
                fill: 'none',
                stroke: 'grey',
                'stroke-opacity': 0.5,
                'stroke-width': 1
            })
            els.push({el: 'text', x: x[i], y: 1.5*fontSize,
                'text-anchor': "middle",
                'font-family': "sans-serif",
                'font-weight': "lighter",
                'font-size': fontSize,
                els: [{el: 'inner', content: Math.trunc(i/lpi).toString()}]
            })
        }
    }
    const y = pos(h, layout.sheet.supi, lpi)
    for(let i=1; i<y.length; i++) {
        if (i%lpi) {
            els.push({el: 'line', x1: 0, y1: y[i], x2: w, y2: y[i],
                fill: 'none',
                stroke: 'grey',
                'stroke-dasharray': '10 10',
                'stroke-opacity': 0.5,
                'stroke-width': 1
            })
        } else {
            els.push({el: 'line', x1: 0, y1: y[i], x2: w, y2: y[i],
                fill: 'none',
                stroke: 'grey',
                'stroke-opacity': 0.5,
                'stroke-width': 1
            })
            els.push({el: 'text', x: fontSize, y: y[i]+6,
                'text-anchor': "middle",
                'font-family': "sans-serif",
                'font-weight': "lighter",
                'font-size': fontSize,
                els: [{el: 'inner', content: Math.trunc(i/lpi).toString()}]
            })
        }
    }
    return els
}
