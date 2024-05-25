import { plaqueGxml } from '../LineageTrainPosterSvg/plaqueGxml.js'

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

    els.push({el: 'text', id: 'header-title',
        x: layout.header.width/2,
        y: 0.5 * layout.header.height,
        'text-anchor': 'middle',
        'font-family': 'sans-serif',
        'font-size': 72 / scale,
        'font-weight':"lighter",
        stroke: 'none',
        'stroke-width': 0,
        fill: 'black',
        els: [{el: 'inner', content: title}]
    })
    
    els.push({el: 'text', id: 'header-subtitle',
        x: layout.header.width/2,
        y: 0.7 * layout.header.height,
        'text-anchor': 'middle',
        'font-family': 'sans-serif',
        'font-size': 36 / scale,
        'font-weight':"lighter",
        stroke: 'none',
        'stroke-width': 0,
        fill: 'black',
        els: [{el: 'inner', content: subtitle}]
    })
    return els
}