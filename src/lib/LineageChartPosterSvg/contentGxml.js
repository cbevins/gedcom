import { flagLegendGxml, flagTableGxml } from '$lib/LineageTrainPosterSvg/flagLegendGxml.js'
import { unionGxml } from './unionGxml.js'

export function contentGxml(geom, settings) {
    // Display counts in a table
    const els = []
    const fontSize = 64 / settings.scale
    const cell = geom.cell

    // Background
    els.push({el: 'rect', x: 0, y: 0, width: geom.width, height: geom.height,
        fill: 'green', stroke: 'black', els: []})

    // Grid
    if (settings.grid) {
        for(let col=0; col<geom.grid.cols; col++) {
            for(let row=0; row<geom.grid.rows; row++ ) {
                els.push({el: 'rect',
                    x: col * cell.width,
                    y: row * cell.height,
                    width: cell.width,
                    height: cell.height,
                    stroke: 'black',
                    fill: 'none'})

                els.push({el: 'text',
                    x: col * cell.width + cell.width/2 - 10,
                    y: row * cell.height + cell.height/2+6,
                    'font-size': fontSize,
                    'text-anchor': 'middle',
                    els: [{el: 'inner', content: `${col},${row}`}]
                })
            }
        }
    }

    // Nodes
    for(let i=0; i<geom.active.length; i++) {
        const node = geom.active[i]
        els.push(unionGxml(node, geom))
    }
    return els
}
