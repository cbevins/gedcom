/**
 * Returns an array of Gxml elements that draw a train track border
 * @param {*} layout The layout rturned by portratLayout()
 * @returns Array of Gxml elements
 */
export function borderGxml(layout) {
    const border = layout.border
    const bt = border.thickness / 2
    const offsets = [2 * bt / 10, 8 * bt / 10]
    const els = []

    //  Railroad ties
    els.push({el: 'rect', id: 'border-rect',
        x: 0,
        y: 0,
        width: border.width,
        height: border.height,
        fill: 'none',
        stroke: 'black',
        'stroke-width': border.thickness,
        'stroke-dasharray': '4 4',
        'stroke-linejoin': "miter",
        fill: 'none',
    })

    // Rails
    const w = border.width
    const h = border.height
    for(let i=0; i<2; i++) {
        const d = offsets[i]
        els.push({el: 'path',
            d: `M ${d} ${d} L ${w-d} ${d} L ${w-d} ${h-d} L ${d} ${h-d} L ${d} ${d}`,
            fill: "none",
            stroke: "black",
            'stroke-width': 1,
        })
    }

    return els
}
