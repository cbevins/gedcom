import { flagGxml } from './flagGxml.js'

const flags = ['CAN','ENG','FRA','GER','IRE','NET','NOR','SCO','SWE','USA','WAL','UNK']

export function flagLegendGxml(x, y, diam, scale=1) {
    const s = scale * diam/100
    const els = []
    for (let i=0; i<flags.length; i++) {
        const href = '#' + flags[i]
        els.push({el: 'g',
            transform: `translate(${x}, ${y}) scale(${s})`,
            els: [
                {el: 'use', x: 0, y: i*120,
                    href: href,
                    filter: "url(#flag-lighting)",
                    'clip-path': "url(#flag-clipper)"
                },
                {el: 'text', x: 120, y: i*120+60, 'font-size': 48, els: [
                    {el: 'inner', content: flags[i]}]
                }
            ]
        })
    }
    return els
}

export function flagLegendGxmlAlt(x, y, diam, scale=1) {
    const s = scale * diam/100
    const els = []
    for (let i=0; i<flags.length; i++) {
        const href = '#' + flags[i]
        els.push(flagGxml(href, x, y+i*120, scale, 100, 100))
        els.push({el: 'text', x: x+120, y: y+i*120+60, 'font-size': 48, els: [
            {el: 'inner', content: flags[i]}]
        })
    }
    return els
}
