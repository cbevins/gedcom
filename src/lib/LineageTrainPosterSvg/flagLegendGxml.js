import { Countries } from './Countries.js'

export function flagLegendGxml(x, y, diam, scale=1) {
    const s = scale * diam/100
    const els = []
    let row = 0
    for(const [, country] of Countries.entries()) {
        const href = '#' + country.flag
        els.push({el: 'g',
            transform: `translate(${x}, ${y}) scale(${s})`,
            els: [
                {el: 'use', x: 0, y: row*120,
                    href: href,
                    filter: "url(#flag-lighting)",
                    'clip-path': "url(#flag-clipper)"
                },
                {el: 'text', x: 120, y: row*120+60, 'font-size': 48, els: [
                    {el: 'inner', content: country.label}]
                }
            ]
        })
        row++
    }
    return els
}

export function flagTableGxml(countries, x, y, diam, scale=1) {
    const s = scale * diam/100
    const els = []
    for (let i=0; i<countries.length; i++) {
        const [country, count] = countries[i]
        const cty = Countries.get(country)
        const href = '#' + cty.flag
        els.push({el: 'g',
            transform: `translate(${x}, ${y}) scale(${s})`,
            els: [
                {el: 'use', x: 0, y: i*120,
                    href: href,
                    filter: "url(#flag-lighting)",
                    'clip-path': "url(#flag-clipper)"
                },
                {el: 'text', x: 120, y: i*120+60, 'font-size': 48, els: [
                    {el: 'inner', content: `${cty.label} (${count})`}]
                }
            ]
        })
    }
    return els
}
