/**
 * Returns an array of Gxml JSON objects defining a map cover for a poster.
 * The map cover is 11" high and 36" wide, folded into 4 9" wide panels.
 * It has a railroad themed border with name plaque.
 * @param {layout} layout The layout rturned by posterLayout()
 * @returns An array of Gxml JSON objects
 */
import { rectTrackPath } from './borderGxml.js'
import { trainTracksGxml } from './trainTracksGxml.js'
import { plaqueGxml } from './plaqueGxml.js'
import { textBegGxml, textEndGxml, textMidGxml } from './textGxml.js'
import WCB from '../images/people/WilliamCollinsBevins_cropped.jpg'
import MMH from '../images/people/MeartiaMargaretHeddens_cropped.png'

export function coverGxml(layout, geom) {
    const {cover, sheet} = layout
    const panels = 4
    const panelWd = (sheet.width / panels)    // 9"
    const panelOff = sheet.pad.l
    const scale = layout.scale

    let els = []
    for(let i=0; i<panels; i++) {
        // Outline for development purposes
        els.push({el: 'rect', x: i*panelWd, y: 0, width: sheet.width/panels, height: cover.height,
            fill: 'none', stroke: 'red', 'stroke-width': 1})
        
        // Rectangular train tracks path with curved edges
        const path = rectTrackPath(i*panelWd+panelOff, panelOff,
            panelWd-2*panelOff, cover.height-2*panelOff, cover.thickness)
        els = els.concat(trainTracksGxml(path, cover.thickness/2, 'green'))
    }
    els = els.concat(cover0Gxml(geom, 0*panelWd, 0, panelWd, cover.height, scale))
    els = els.concat(cover1Gxml(geom, 1*panelWd, 0, panelWd, cover.height, scale))
    els = els.concat(cover2Gxml(geom, 2*panelWd, 0, panelWd, cover.height, scale))
    els = els.concat(cover3Gxml(geom, 3*panelWd, 0, panelWd, cover.height, scale))
    return els
}

function cover0Gxml(geom, x, y, width, height, scale) {
    const els = []
    return els
}

function filigreeGxml(xm, ym, width, height, color='black') {
    return [
        {el: 'line',
            x1: xm-width/2, y1: ym,
            x2: xm+width/2, y2: ym,
            stroke: color, fill: color},
        {el: 'circle',
            cx: xm, cy: ym, r:height,
            stroke: color, fill: color}
    ]
}
function cover1Gxml(geom, x, y, width, height, scale) {
    const x1 = x + 100/scale
    const y1 = y + 100/scale
    const x2 = x + width - 100/scale
    const y2 = y1 + 260/scale
    const radius = 20/scale
    const thickness = 5/scale
    const els = plaqueGxml(x1, y1, x2, y2, radius, thickness)

    const xm = (x1 + x2)/2
    const ym = (y1 + y2)/2
    const text = [
        {y: 40, fs: 24, color: 'black', content: 'William Collins'},
        {y: 80, fs: 50, color: 'red', content: 'BEVINS'},
        {y: 125, fs: 50, color: 'black', content: '&'},
        {y: 150, fs: 24, color: 'black', content: 'Meartia Margaret'},
        {y: 190, fs: 50, color: 'red', content: 'HEDDENS'},
        {y: 240, fs: 50, color: 'black', content: 'LINEAGE MAP'},
        {y: 360, fs: 36, color: 'black', content: `${geom.genMax} Generations`},
        {y: 440, fs: 36, color: 'black', content: `${geom.nodes.length} Ancestors`},
        {y: 520, fs: 36, color: 'black',
            content: `Born from ${geom.birthMin} through ${geom.birthMax}`},
    ]
    for(let i=0; i<text.length; i++) {
        const t = text[i]
        els.push(textMidGxml(xm, (y1+t.y/scale), t.fs/scale, t.content, t.color))
    }
    [390,470].forEach((ym) => {
        els.push(filigreeGxml(xm, (y1+ym/scale), 100/scale, 10/scale))
    })

    const picHt = 160/scale
    const picWd = 160/scale
    const picY = ym - 160/scale/2
    const picX1 = x1 + 20/scale
    const picX2 = x2 - picWd - 20/scale
    els.push({el: 'image', x: picX1, y: picY, width: picWd, height: picHt, href: WCB})
    els.push({el: 'image', x: picX2, y: picY, width: picWd, height: picHt, href: MMH})
    return els
}

function cover2Gxml(geom, x, y, width, height, scale) {
    const els = []
    for(let i=0; i<geom.nodes.length; i++) {}
    return els
}

function cover3Gxml(geom, x, y, width, height, scale) {
    const els = []
    return els
}
