function x1(geom, node) { return geom.yearX(node.birthYear) }

function y1(geom, node) { return geom.chanY(node.channel) }

function x2(geom, node) { return geom.yearX(node.child.birthYear) }
    
function y2(geom, node) { return geom.chanY(node.child.channel) }

// Return <path d=> data path from subject to child
function pathData(geom, node, offset) {
    const xa = x1(geom, node) + offset
    const ya = y1(geom, node) + offset
    const xb = x2(geom, node) + offset
    const yb = y2(geom, node) + offset
    return `M ${xa} ${ya} L ${xb} ${ya} L ${xb} ${yb}`
}

export function trainTracksGxml(geom) {
    const trackWidth = geom.trackWidth
    const dashes = `${0.3 * trackWidth} ${0.3 * trackWidth}`
    const offsets = [0.2 * trackWidth, -0.2 * trackWidth]
    const els = []
    const nodes = geom.channelsObj.nodesBySeq()
    for(let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        if (node.child) {
            els.push({el: 'path',
                d: pathData(geom, node, 0), 
                fill: "none",
                stroke: geom.color(node),
                'stroke-linejoin': "round",
                'stroke-dasharray': dashes,
                'stroke-width': trackWidth
            })

            for(let j=0; j<offsets.length; j++) {
                els.push({el: 'path',
                    d: pathData(geom, node, offsets[j]),
                    fill: "none",
                    stroke: geom.color(node),
                    'stroke-linejoin': "round",
                    'stroke-width':"1"
                })
            }
        }
    }
    return els
}
