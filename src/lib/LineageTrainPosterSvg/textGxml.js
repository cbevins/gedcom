const proto ={el: 'text', x: 0, y: 0,
    'text-anchor': "middle",
    'font-family': 'sans-serif',
    'font-size': 16,
    'font-weight': 'lighter',
    stroke: 'none',
    'stroke-width': 0,
    fill: 'black'
}

export function textBegGxml(x, y, scaledSize, text, color="black", weight='lighter') {
    return {...proto, x: x, y: y,
        'text-anchor': "start",
        'font-family': 'sans-serif',
        'font-size': scaledSize,
        'font-weight': weight,
        fill: color,
        els: [{el: 'inner', content: text}]
    }
}

export function textEndGxml(x, y, scaledSize, text, color="black", weight='lighter') {
    return {...proto, x: x, y: y,
        'text-anchor': "end",
        'font-size': scaledSize,
        'font-weight': weight,
        fill: color,
        els: [{el: 'inner', content: text}]
    }
}

export function textMidGxml(x, y, scaledSize, text, color="black", weight='lighter') {
    return {...proto, x: x, y: y,
        'text-anchor': "middle",
        'font-size': scaledSize,
        'font-weight': weight,
        fill: color,
        els: [{el: 'inner', content: text}]
    }
}
