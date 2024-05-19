import { flagGxml } from './flagGxml.js'

const flags = ['CAN','ENG','FRA','GER','IRE','NET','NOR','SCO','SWE','USA','WAL','UNK']

const flagMap = new Map([
    ['Canada', 'CAN'],
    ['England', 'ENG'],
    ['France', 'FRA'],
    ['Germany', 'GER'],
    ['Ireland', 'IRE'],
    ['Netherlands', 'NET'],
    ['Norway', 'NOR'],
    ['Scotland', 'SCO'],
    ['Sweden','SWE'],
    ['USA', 'USA'],
    ['Wales', 'WAL'],
    ['', 'UNK']
])

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

export function flagTableGxml(countries, x, y, diam, scale=1) {
    const s = scale * diam/100
    const els = []
    for (let i=0; i<countries.length; i++) {
        const [country, count] = countries[i]
        const flag = flagMap.get(country)
        const href = '#' + flag
        els.push({el: 'g',
            transform: `translate(${x}, ${y}) scale(${s})`,
            els: [
                {el: 'use', x: 0, y: i*120,
                    href: href,
                    filter: "url(#flag-lighting)",
                    'clip-path': "url(#flag-clipper)"
                },
                {el: 'text', x: 120, y: i*120+60, 'font-size': 48, els: [
                    {el: 'inner', content: `${country} (${count})`}]
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
