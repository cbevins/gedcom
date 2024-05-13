
function birthPlace(node) {
    const place = node.person.birthPlace()
    const text = place.text()
    return node.person.birthState() + ', ' + node.person.birthCountry()
}

function children(node) {
    let str = ''
    if (node.person.isFemale()) {
        const n = node.person.children().length
        str = (n===1) ? ' (1 child)' : ` (${n} children)`
    }
    return str
}

function suffixNoSeq(node) {
    return node.person.nameSuffixNoSeq()
    // let idx = suffix.search("#")
    // return (idx >= 0) ? (suffix.slice(0, idx-1)).trim() : suffix.trim()
}

function firstNames(node) {
    return node
        ? '#' + node.seq + ' '
            + (node.person.namePrefix()
            + ' ' + node.person.nameGiven()).trim()
        : ''
}

function lastNames(node) {
    return node ? (node.person.nameSurnames() + ' ' + suffixNoSeq(node) + node.person.lifeSpan())
        : ''
}

export function trackNameGxml(geom, node) {
    const els = []
    const x = geom.nameX(node)
    const y = geom.nameY(node)
    els.push({el: 'text', x: x, y: y - 1.5 * geom.fontSize,
        'text-anchor': "middle",
        'font-family': "sans-serif",
        'font-weight': "bold",
        'font-size': 1.5*geom.fontSize,
        els: [{el: 'inner', content: firstNames(node)}]
    })

    els.push({el: 'text', x: x, y: y - 0.3 * geom.fontSize,
        'text-anchor': "middle",
        'font-family': "sans-serif",
        'font-weight': "bold",
        'font-size': 1.5 * geom.fontSize,
        els: [{el: 'inner', content: lastNames(node)}]
    })

    els.push({el: 'text', x: x, y: y + 2.2 * geom.trackWidth,
        'text-anchor': "middle",
        'font-family': "sans-serif",
        'font-weight': "lighter",
        'font-size': geom.fontSize,
        els: [{el: 'inner', content: birthPlace(node)}]
    })

    els.push({el: 'text', x: x,  y: y + 3 * geom.fontSize,
        'text-anchor': "middle",
        'font-family': "sans-serif",
        'font-weight': "lighter",
        'font-size': geom.fontSize,
        else: [{el: 'inner', content: children(node)}]
    })
    return els
}
