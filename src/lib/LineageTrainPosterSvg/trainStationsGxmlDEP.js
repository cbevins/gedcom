import { countryAbbr, countryFlagHref } from './Countries.js'

export function trainStationsGxml(geom) {
    const els = []
    const scale = 2 * geom.radius / 100    // flags are in a 100x100 rectangle
    console.log('trainStations scale', scale)
    const nodes = geom.channelsObj.nodesBySeq()
    for(let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        const cx = geom.yearX(node.birthYear)
        const cy = geom.chanY(node.channel)
        
        // els.push({el: 'use',
        //     x: cx,
        //     y: cy,
        //     'xlink:href': countryFlagHref(node.birthCountry),
        //     filter: "url(#flag-lighting)",
        //     'clip-path':"url(#flag-clipper)",
        //     transform: `scale(0.99)`
        // })

        els.push({el: 'circle',
            cx: cx,
            cy: cy,
            r: geom.radius,
            fill: "none",
            stroke: geom.color(node),
            'stroke-width': 4
        })
    }
    return els
}
