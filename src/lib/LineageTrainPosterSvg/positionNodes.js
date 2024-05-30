// geom is object returned by trainNodeGeom(nodes)
export function positionNodes(geom) {
    const nodes = geom.nodes
    return _position(geom, nodes[0])
}

// Adds each node's prop.x and prop.y properties
function _position(geom, node) {
    // traverse to the end
    if (node.father) _position(geom, node.father)
    if (node.mother) _position(geom, node.mother)
    node.x = geom.yearX(node.birthYear)
    node.chany = geom.chanY(node.channel)
    node.y = node.chany
    if (node.father && node.mother) {
        node.y = (node.father.y + node.mother.y) / 2
    }
}
