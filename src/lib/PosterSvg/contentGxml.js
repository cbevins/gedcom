/**
 * Returns an array of Gxml JSON objects defining content for the poster's 'content' region.
 * In this example, it is a grid with 10 columns and 20 rows.
 * 
 * @param {} width Grid width in SVG units
 * @param {*} height Grid height in SVG units
 * @returns An array of Gxml JSON objects
 */
import { flagGxml } from './flagGxml.js'
import { trainStationGxml } from './trainStationGxml.js'
import { trainTracksGxml } from './trainTracksGxml.js'

export function contentGxml(width=1000, height=2000) {
    const els = []

    // First create a 10 by 20 grid with col,row markers and an outer border
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
            els.push({el: 'text', id: `grid-cell-${col}-${row}`, 
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
    els.push({el: 'rect', id: 'grid-border-rect', x: 0, y: 0, width: width, height: height,
        stroke: 'black', 'stroke-width': 1, fill: 'none', els: []})

    // Then stick some flags inside some of the cells
    els.push(flagGxml('#FRA', 0, 0))
    els.push(flagGxml('#NOR', 100, 100))
    els.push(flagGxml('#ENG', 200, 200))
    els.push(flagGxml('#WAL', 300, 300))
    els.push(flagGxml('#SCO', 400, 400))
    els.push(flagGxml('#IRE', 500, 500))
    els.push(flagGxml('#SWE', 600, 600))
    els.push(flagGxml('#CAN', 700, 700))
    els.push(flagGxml('#GER', 800, 800))
    els.push(flagGxml('#NET', 900, 900))

    els.push(flagGxml('#USA', 400, 0, 4))

    // Try a TrainStation!
    els.push(trainStationGxml(200, 700, '#USA', '13th GGP', '1952', 'magenta'))
    els.push(trainStationGxml(200, 800, '#USA', '13th GGP', '1952', 'blue', 4))

    // Try some train tracks
    const trackWidth = 30
    const path = 'M 50 350 L 250 350 L 250 650 L 750 650 L 750 250 L 350 250 L 350 1050'
    els.push(trainTracksGxml(path, trackWidth, 'blue'))
    return els
}
