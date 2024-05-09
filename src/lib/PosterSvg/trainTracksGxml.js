export function trainTracksGxml(path, trackWidth, color='blue', scale=1) {
    const dashes = `${0.3 * trackWidth} ${0.3 * trackWidth}`
    const w3 = trackWidth
    const w1 = 0.6 * trackWidth
    const w2 = 0.4 * trackWidth
    return [
        {el: 'path', d: path, stroke: color, 'stroke-width': w1, fill: 'none' },
        {el: 'path', d: path, stroke: 'white', 'stroke-width': w2, fill: 'none',
            'fill-opacity': 0.1},
        {el: 'path', d: path, stroke: color, 'stroke-width': w3, fill: 'none',
        'stroke-dasharray': dashes}]
}
