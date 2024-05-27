import { flagGxml } from '../PosterSvg/flagGxml.js'
import { trainStationGxml } from '../LineageTrainPosterSvg/trainStationGxml.js'

export const UnionLines = {
    father: {name: 2, tags: 3, born: 4, died: 5},
    mother: {name: 10, tags: 11, born: 12, died: 13},
    union: {date: 7, children: 8},
}

// Displays the *parents* of the node subject
export function unionGxml(node, geom) {
    const drawBorder = false
    const scale = geom.scale
    const factor = 1    // TO BE DEPRECATED!!!
    const els = []

    // Padding for connectors; 2 on the left and 1 on the right
    const padLeft = 0.08 * geom.node.width          // 0.08 x 500 = 40
    const padRight = 0.04 * geom.node.width         // 0.04 x 500 = 20
    const round = 10

    // Each card has 16 lines
    const lines = 16                                // meta, father, subject, mother, extra
    const lineHt = geom.node.height / lines
    const line = UnionLines

    // Person tag element sizes adjusted for padding, lines, and lineHt
    const tagWidth = geom.node.width - padLeft - padRight   // 500 - 40 - 20 = 440
    const tagHeight = 4 * lineHt        // 320 / 16 = 20

    // Union rectangle
    const unionPad = 50 * factor
    const unionWidth = tagWidth - 2 * unionPad
    const unionHeight =  2 * lineHt

    const x1 = node.prop.x              // left edge of node box
    const x2 = x1 + padLeft             // start of tag box
    // const x3 = x2 + 50 * factor      // start of tag text
    const x4 = x2 + tagWidth            // end of tag box
    // const x5 = x4 + padRight            // right edge of node box
    const cx = (x1 + x2) / 2            // Curved Bezier control point x
    const xmid = node.prop.x + geom.node.width / 2
    const ymid = node.prop.y + geom.node.height / 2
    const tmid = x2 + tagWidth/2        // x-mid of tag box (for centering text)

    // The following return the y-coordinate of line index 'idx' [0-15]
    function lineBase(idx) { return lineBot(idx) - 3 * factor }
    function lineBot(idx) { return node.prop.y + idx * lineHt + lineHt }
    function lineMid(idx) { return node.prop.y + idx * lineHt + lineHt / 2 }
    function lineTop(idx) { return node.prop.y + idx * lineHt }

    function childPath() {
        const child = node.child
        const dy = node.person.isFemale() ? line.mother.born : line.father.born
        const y = child.prop.y + dy * lineHt
        const x = child.prop.x + geom.node.width
        const cpx = (x1 + x)/2 
        return `M ${x1} ${ymid} C ${cpx} ${ymid} ${cpx} ${y} ${x} ${y} L ${x-20} ${y}`
    }
    function fatherPath() {
        const y = lineTop(line.father.born)
        return `M ${x1} ${ymid} C ${cx} ${ymid} ${cx} ${y} ${x2} ${y} L ${xmid} ${y}`
    }
    function motherPath() {
        const y = lineTop(line.mother.born)
        return `M ${x1} ${ymid} C ${cx} ${ymid} ${cx} ${y} ${x2} ${y} L ${xmid} ${y}`
    }

    // Union card border
    els.push({el: 'rect', x: node.prop.x, y: node.prop.y,
        width: geom.node.width, height: geom.node.height,
        fill: "none", stroke: "red"})
            
    // Connectors
    els.push({el: 'path', d: fatherPath(), 'stroke-width': 10 * factor,
        fill: 'none', stroke: 'grey', 'stroke-linecap': 'flat'})
    els.push({el: 'path', d: motherPath(), 'stroke-width': 10 * factor,
        fill: 'none', stroke: 'grey', 'stroke-linecap': 'flat'})
    if (node.child)
        els.push({el: 'path', d: childPath(), 'stroke-width': 10 * factor,
            fill: 'none', stroke: 'grey', 'stroke-linecap': 'flat'})

    // Father, Mother, and Union
    els.push({el: 'rect', x: x2, y: lineTop(line.father.name),
        rx: round, ry: round, width: tagWidth, height: tagHeight,
        fill: 'cyan', stroke: 'blue', 'stroke-width': 1})
    els.push({el: 'rect', x: x2, y: lineTop(line.mother.name),
        rx: round, ry: round, width: tagWidth, height: tagHeight,
        fill: 'pink', stroke: 'red', 'stroke-width': 1})
    els.push({el: 'rect', x: x2+unionPad, y: lineTop(line.union.date),
        rx: round, ry: round, width: unionWidth, height: unionHeight,
        fill: 'white', stroke: 'silver', 'stroke-width': 4})

    // Union bonds (class='union')
    els.push({el: 'line', x1: tmid, y1: lineTop(6), x2: tmid, y2: lineTop(7),
        fill: 'white', stroke: 'silver', 'stroke-width': 4})
    els.push({el: 'line', x1: tmid, y1: lineTop(9), x2: tmid, y2: lineTop(10),
        fill: 'white', stroke: 'silver', 'stroke-width': 4})

    // Union Content
    node.prop.lines.forEach((content, i) => {
        els.push({el: 'text',
            x: tmid,
            y: lineBase(i),
            'text-anchor': "middle",
            'font-family': "sans-serif",
            'font-weight': "lighter",
            'font-size': 16 * factor, 
            els: [{el: 'inner', content: content}]
        })
    })

    // Flags
    const flagDiam = 100    // do not change --- this is from the flag <defs>!!!
    const stationScale = 0.75
    const flagY = (1-stationScale) * flagDiam / 2
    const flagX = stationScale * flagDiam
    const flags = []
    if (node.father.prop.flag) flags.push(node.father)
    if (node.mother.prop.flag) flags.push(node.mother)
    for(let i=0; i<flags.length; i++) {
        const node = flags[i]
        const y = (i===0) ? lineMid(1) + flagY : lineMid(9) + flagY
        els.push(trainStationGxml(x2, y, node.prop.flag.death,
            '', '', 'red', stationScale))
        els.push(trainStationGxml(x4-flagX, y, node.prop.flag.birth,
            '', '', 'red', stationScale))
    }
    return els
}