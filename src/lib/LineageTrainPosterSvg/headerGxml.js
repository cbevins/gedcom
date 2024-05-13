import { plaquePath } from './plaquePath.js'

export function screw(cx, cy, r, stroke, fill) {
    const slot = 0.5 * r
    return [
        {el: 'circle', cx: cx, cy: cy, r: r, stroke: stroke, fill: fill},
        {el: 'line', x1: cx-slot, y1: cy, x2: cx+slot, y2: cy, stroke: stroke, 'stroke-width': 1},
        {el: 'line', x1: cx, y1: cy-slot, x2: cx, y2: cy+slot, stroke: stroke, 'stroke-width': 1},
    ]
}

export function headerGxml(layout, title, subtitle='') {
    const h = layout.header.height
    const w = layout.header.width
    const x1 = 0.1 * w
    const x2 = 0.9 * w
    const y1 = 0.1 * h
    const y2 = 0.9 * h
    const r = 0.2 * h
    const thickness = 5

    const els = []
    els.push({el: 'path',
        d: plaquePath(x1, y1, x2, y2, r),
        stroke: 'black',
        'stroke-width': thickness,
        'stroke-linecap': 'square',   // butt, round, square 
        fill: 'white',
        filter: "url(#shadow)" })

    els.push({el: 'text', id: 'header-title',
        x: layout.header.width/2,
        y: 0.5 * layout.header.height,
        'text-anchor': 'middle',
        'font-family': 'sans-serif',
        'font-size': layout.content.scale * 144,
        'font-weight':"lighter",
        stroke: 'none',
        'stroke-width': 0,
        fill: 'black',
        els: [{el: 'inner', content: title}]
    })
    
    els.push({el: 'text', id: 'header-subtitle',
        x: layout.header.width/2,
        y: 0.8 * layout.header.height,
        'text-anchor': 'middle',
        'font-family': 'sans-serif',
        'font-size': layout.content.scale * 72,
        'font-weight':"lighter",
        stroke: 'none',
        'stroke-width': 0,
        fill: 'black',
        els: [{el: 'inner', content: subtitle}]
    })

    const screw1 = screw(x1+r, h/2, r/2, 'brown', 'gold')
    const screw2 = screw(x2-r, h/2, r/2, 'brown', 'gold')
    return [...els, ...screw1, ...screw2]
}