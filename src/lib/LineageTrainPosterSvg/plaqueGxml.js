/**
 * Creates a <path> 'd' string 
 * @param {*} x1 Plaque upper left corner x-coordinate
 * @param {*} y1 Plaque upper left corner y-coordinate
 * @param {*} x2 Plaque lower left corner x-coordinate
 * @param {*} y2 Plaque lower left corner y-coordinate
 * @param {*} radius Radius of the corner cuts
 * @returns A <path> 'd' specification string
 */

export function plaqueGxml(x1, y1, x2, y2, radius, thickness) {
    const plaque = {el: 'path',
        d: plaquePath(x1, y1, x2, y2, radius),
        stroke: 'black',
        'stroke-width': thickness,
        'stroke-linecap': 'square',   // butt, round, square 
        fill: 'white',
        filter: "url(#shadow)" }

    const screw1 = plaqueScrew(x1+radius, (y1+y2)/2, radius/2, 'brown', 'gold')
    const screw2 = plaqueScrew(x2-radius, (y1+y2)/2, radius/2, 'brown', 'gold')
    return [plaque, ...screw1, ...screw2]
}

export function plaquePath(x1, y1, x2, y2, radius) {
    const r = radius
    return `M ${x1} ${y1+r} A ${r} ${r} 0 0 0 ${x1+r} ${y1} `
        + `L ${x2-r} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y1+r} `
        + `L ${x2} ${y2-r} A ${r} ${r} 0 0 0 ${x2-r} ${y2} `
        + `L ${x1+r} ${y2} A ${r} ${r} 0 0 0 ${x1} ${y2-r} `
        + `L ${x1} ${y1+r}`
}

export function plaqueScrew(cx, cy, r, stroke, fill) {
    const slot = 0.5 * r
    return [
        {el: 'circle', cx: cx, cy: cy, r: r, stroke: stroke, fill: fill},
        {el: 'line', x1: cx-slot, y1: cy, x2: cx+slot, y2: cy, stroke: stroke, 'stroke-width': 1},
        {el: 'line', x1: cx, y1: cy-slot, x2: cx, y2: cy+slot, stroke: stroke, 'stroke-width': 1},
    ]
}