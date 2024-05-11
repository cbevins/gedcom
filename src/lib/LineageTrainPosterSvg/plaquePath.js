/**
 * Creates a <path> 'd' string 
 * @param {*} x1 Plaque upper left corner x-coordinate
 * @param {*} y1 Plaque upper left corner y-coordinate
 * @param {*} x2 Plaque lower left corner x-coordinate
 * @param {*} y2 Plaque lower left corner y-coordinate
 * @param {*} radius Radius of the corner cuts
 * @returns A <path> 'd' specification string
 */
export function plaquePath(x1, y1, x2, y2, radius) {
    const r = radius
    return `M ${x1} ${y1+r} A ${r} ${r} 0 0 0 ${x1+r} ${y1} `
        + `L ${x2-r} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y1+r} `
        + `L ${x2} ${y2-r} A ${r} ${r} 0 0 0 ${x2-r} ${y2} `
        + `L ${x1+r} ${y2} A ${r} ${r} 0 0 0 ${x1} ${y2-r} `
        + `L ${x1} ${y1+r}`
}
