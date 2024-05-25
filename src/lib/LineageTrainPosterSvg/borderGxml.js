/**
 * Returns an array of Gxml JSON objects defining content for the poster's 'border' region.
 * In this case, it draws a border in the style of train tracks.
 * @param {layout} layout The layout rturned by portraitLayout()
 * @returns An array of Gxml JSON objects
 */
import { trainTracksGxml } from './trainTracksGxml.js'

export function rectTrackPath(x1, y1, width, height, r) {
    const x2 = x1 + width
    const y2 = y1 + height
    const path = `M ${x1+r} ${y1} `
        + `L ${x2-r} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1+r} `
        + `L ${x2} ${y2-r} A ${r} ${r} 0 0 1 ${x2-r} ${y2} `
        + `L ${x1+r} ${y2} A ${r} ${r} 0 0 1 ${x1} ${y2-r} `
        + `L ${x1} ${y1+r} A ${r} ${r} 0 0 1 ${x1+r} ${y1} `
    return path
}

export function borderGxml(layout) {
    const border = layout.border
    const bt = border.thickness / 2
    const path = rectTrackPath(bt/2, bt/2, border.width-bt, border.height-bt, 2*bt)
    return trainTracksGxml(path, bt, 'black')
}
