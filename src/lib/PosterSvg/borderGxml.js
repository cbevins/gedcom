/**
 * Returns an array of Gxml JSON objects defining content for the poster's 'border' region.
 * In this case, it draws a border in the style of train tracks.
 * @param {layout} layout The layout rturned by portraitLayout()
 * @returns An array of Gxml JSON objects
 */
export function borderGxml(layout) {
    const border = layout.border
    const bt = border.thickness / 2
    const off1 = 2 * bt / 10
    const off2 = 8 * bt / 10
    const offsets = [off1, off2]
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
        const o = offsets[i]
        els.push({el: 'rect',
            x: o,
            y: o,
            width: w-2*o,
            height: h-2*o,
            fill: 'none',
            stroke: 'black',
            'stroke-width': 1
        })
    }
    return els
}
