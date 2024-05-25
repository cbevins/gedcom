/**
 * Returns an array of Gxml JSON objects defining a map cover for a poster.
 * The map cover is 11" high and 36" wide, folded into 4 9" wide panels.
 * It has a railroad themed border with name plaque.
 * @param {layout} layout The layout rturned by posterLayout()
 * @returns An array of Gxml JSON objects
 */
import { trainTracksGxml, rectTrackPath } from './trainTracksGxml.js'

export function coverGxml(layout) {
    const {cover, sheet} = layout
    const panels = 4
    const panelWd = (sheet.width / panels)    // 9"
    const panelOff = sheet.pad.l

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
    return els
}
