/**
 * Returns an array of Gxml JSON objects defining content for the poster's 'border' region.
 * In this case, it draws a border in the classic style.
 * @param {layout} layout The layout rturned by portraitLayout()
 * @returns An array of Gxml JSON objects
 */
export function borderGxml(layout) {
    const border = layout.border
    const els = []

    //  Wide black border
    els.push({el: 'rect', id: 'border-rect',
        x: 0,
        y: 0,
        width: border.width,
        height: border.height,
        fill: 'black',
        stroke: 'black',
        'stroke-width': border.thickness,
        'stroke-linejoin': "miter",
        fill: 'none',
    })

    //  White dashes
    const offset = border.thickness / 4
    els.push({el: 'rect', id: 'border-rect',
        x: 0 + offset,
        y: 0 + offset,
        width: border.width - 2 * offset,
        height: border.height - 2 * offset,
        fill: 'none',
        stroke: 'white',
        'stroke-width': 0.4 * border.thickness,
        'stroke-dasharray': '25 25',
        'stroke-linejoin': "miter",
        fill: 'none',
    })
    return els
}
