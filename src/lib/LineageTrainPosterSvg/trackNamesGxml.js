function birthPlace(node) { return node.person.birthPlace().text() }

function children(node) {
    let str = ''
    if (node.person.isFemale()) {
        const n = node.person.children().length
        str = (n===1) ? ' (1 child)' : ` (${n} children)`
    }
    return str
}

function suffixNoSeq(suffix) {
    let idx = suffix.search("#")
    return (idx >= 0) ? (suffix.slice(0, idx-1)).trim() : suffix.trim()
}

function firstNames(node) {
    return node
        ? '#' + node.seq + ' '
            + (node.person.namePrefix()
            + ' ' + node.person.nameGiven()).trim()
        : ''
}

function lastNames(node) {
    return node
        ? (node.person.nameSurnames() + ' '
            + suffixNoSeq(node.person.nameSuffix())).trim()
            + node.person.lifeSpan()
        : ''
}

export function trackNamesGxml(geom) {
    const nodes = geom.channelsObj.nodesBySeq()
    const els = []
    for(let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        const x = geom.nameX(node)
        const y = geom.nameY(node)
        els.push({el: 'text', x: x, y: y - geom.fontSize,
            'text-anchor': "middle",
            'font-family': "sans-serif",
            'font-weight': "bold",
            'font-size': geom.fontSize,
            els: [{el: 'inner', content: firstNames(node)}]
        })

        els.push({el: 'text', x: x, y: y - 0.05 * geom.fontSize,
            'text-anchor': "middle",
            'font-family': "sans-serif",
            'font-weight': "bold",
            'font-size': geom.fontSize,
            els: [{el: 'inner', content: lastNames(node)}]
        })

        els.push({el: 'text', x: x, y: y + 2 * geom.trackWidth,
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
    }
    return els
}
