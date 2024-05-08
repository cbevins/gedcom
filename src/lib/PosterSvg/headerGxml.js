/**
 * Returns an array of Gxml JSON objects defining content for the poster's 'header' region.
 * @param {layout} layout The layout rturned by portraitLayout()
 * @param {str} title The main title text
 * @param {str} subtitle The subtitle text
 * @returns An array of Gxml JSON objects
 */
export function headerGxml(layout, title, subtitle='') {
    const els = []
    els.push({el: 'text', id: 'header-title',
        x: layout.header.width/2,
        y: 0.5 * layout.header.height,
        'text-anchor': 'middle',
        'font-family': 'sans-serif',
        'font-size': layout.content.scale * 36,
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
        'font-size': layout.content.scale * 16,
        'font-weight':"lighter",
        stroke: 'none',
        'stroke-width': 0,
        fill: 'black',
        els: [{el: 'inner', content: subtitle}]
    })
    return els
}