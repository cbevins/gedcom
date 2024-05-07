export function trainStationsGxml(geom) {
    const els = []
    const nodes = geom.channelsObj.nodesBySeq()
    for(let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        const cx = geom.yearX(node.birthYear)
        const cy = geom.chanY(node.channel)
            els.push({el: 'circle',
            cx: cx,
            cy: cy,
            r: geom.radius,
            fill: "red",
            stroke: geom.color(node),
            'stroke-width': 2
        })
    }
    return els
}
