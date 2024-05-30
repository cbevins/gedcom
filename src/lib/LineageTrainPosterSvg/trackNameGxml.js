function birthPlace(node) {
    const place = node.person.birthPlace()
    const text = place.text()
    return node.person.birthState() + ', ' + node.person.birthCountry()
}

function children(node) {
    let str = ''
    let n = 0
    if (node.person.isFemale()) {
        n = node.person.children().length
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

function nameX(geom, node) {
    if (node ) {
        const x2 = node.child ? node.child.x : geom.yearX(geom.yearMax)
        // const childYear = node.child ? node.child.birthYear : node.birthYear + this.addYears
        // return this.yearX((node.birthYear + childYear) / 2)
        return (node.x + x2) / 2
    }
    return 0
}

function nameY(geom, node) {
    return node ? node.y - 0.6 * geom.trackWidth : 0
}

export function trackNameGxml(geom, node, anchor="middle") {
    const els = []
    const x = nameX(geom, node)
    const y = nameY(geom, node)

    els.push({el: 'text',
        x: x,
        y: y - 1.6 * geom.fontSize,
        'text-anchor': anchor,
        'font-family': "sans-serif",
        'font-weight': "bold",
        'font-size': 1.5 * geom.fontSize,
        els: [{el: 'inner', content: firstNames(node)}]
    })

    els.push({el: 'text',
        x: x,
        y: y - 0.2 * geom.fontSize,
        'text-anchor': anchor,
        'font-family': "sans-serif",
        'font-weight': "bold",
        'font-size': 1.5 * geom.fontSize,
        els: [{el: 'inner', content: lastNames(node)}]
    })

    els.push({el: 'text',
        x: x,
        y: y + 1.6 * geom.trackWidth,
        'text-anchor': anchor,
        'font-family': "sans-serif",
        'font-weight': "lighter",
        'font-size': 1.2 * geom.fontSize,
        els: [{el: 'inner', content: birthPlace(node)}]
    })
    
    els.push({el: 'text',
        x: x,
        y: y + 2.2 * geom.trackWidth,
        'text-anchor': anchor,
        'font-family': "sans-serif",
        'font-weight': "lighter",
        'font-size': 1.2 * geom.fontSize,
        els: [{el: 'inner', content: children(node)}]
    })
    return els
}
