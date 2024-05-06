export function footerGxml(layout) {
    const d8 = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    const els = []
    els.push({el: 'text', id: 'footer-copyright',
        x: layout.supi,
        y: 0.9 * layout.footer.height,
        'text-anchor': 'start',
        'font-family': 'sans-serif',
        'font-size': layout.content.scale * 12,
        'font-weight':"lighter",
        stroke: 'none',
        'stroke-width': 0,
        fill: 'black',
        els: [{el: 'inner', content: 'Produced by Collin D Bevins'}]
    })
    els.push({el: 'text', id: 'header-subtitle',
        x: layout.footer.width,
        y: 0.9 * layout.footer.height,
        'text-anchor': 'end',
        'font-family': 'sans-serif',
        'font-size': layout.content.scale * 12,
        'font-weight':"lighter",
        stroke: 'none',
        'stroke-width': 0,
        fill: 'black',
        els: [{el: 'inner', content: d8}]
    })
    return els
}