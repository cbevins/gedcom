import { plaqueGxml } from './plaqueGxml.js'
import { textMidGxml } from './textGxml.js'

export function headerGxml(layout, scale, title, subtitle='') {
    const h = layout.header.height
    const w = layout.header.width
    const x1 = 0.1 * w
    const x2 = 0.9 * w
    const y1 = 0.1 * h
    const y2 = 0.8 * h
    const r = 0.2 * h
    const thickness = 5

    const els = []
    els.push(plaqueGxml(x1, y1, x2, y2, r, thickness))

    let x = layout.header.width/2
    let y = 0.5 * layout.header.height
    els.push(textMidGxml(x, y, 72 / scale, title))

    y = 0.7 * layout.header.height
    els.push(textMidGxml(x, y, 36 / scale, subtitle))

    return els
}