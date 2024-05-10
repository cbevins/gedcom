export function trainTracksGxml(path, trackWidth, color='blue') {
    const dashes = `${0.3 * trackWidth} ${0.3 * trackWidth}`
    const w3 = trackWidth
    const w1 = 0.6 * trackWidth
    const w2 = 0.4 * trackWidth
    return [
       // Wide blue line that becomes rails when overlaid by the thinner white line
        {el: 'path', d: path, stroke: color, 'stroke-width': w1, fill: 'none'},
        // White line running inside the wider blue line
        {el: 'path', d: path, stroke: 'white', 'stroke-width': w2, fill: 'none'},
        // Third dashed line
        {el: 'path', d: path, stroke: color, 'stroke-width': w3, fill: 'none',
            'stroke-dasharray': dashes }]
}
