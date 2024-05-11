import { trainStationGxml } from './trainStationGxml.js'
import { trainTracksGxml } from '../PosterSvg/index.js'
// import { gridGxml } from './gridGxml.js'
import SamuelBevins from '$lib/LineageTrainPosterSvg/Samuel Bevins.jpg'

const Country = new Map([
    ['', 'UNK'],
    ['Canada', 'CAN'],
    ['England', 'ENG'],
    ['France', 'FRA'],
    ['Germany', 'GER'],
    ['Ireland', 'IRE'],
    ['Netherlands', 'NET'],
    ['Norway', 'NOR'],
    ['Scotland', 'SCO'],
    ['Sweden', 'SWE'],
    ['USA', 'USA'],
    ['Wales', 'WAL'],
])

// NOTE - station x,y are for upper left corner; ADJUST FOR CENTER
function trackPath(geom, year1, chan1, year2, chan2) {
    const x1 = geom.yearX(year1)
    const y1 = geom.chanY(chan1)
    const x2 = geom.yearX(year2)
    const y2 = geom.chanY(chan2)
    const path = `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`
    return path
}

function genLabel(node) {
    const gen = node.gen
    const female = node.person.isFemale()
    const p = female ? 'M' : 'F'
    if (gen === 0) return 'Subject'
    else if (gen === 1) return female ? 'Mother' : 'Father'
    else if (gen === 2) return female ? 'Grand Mother' : 'Grand Father'
    else if (gen === 3) return '1st GG' + p
    else if (gen === 4) return '2nd GG' + p
    else if (gen === 5) return '3rd GG' + p
    return `${gen-2}th GG` + p
}

export function contentGxml(geom) {
    // const els = gridGxml(geom)
    // Start with a white backdrop
    const els = [{el: 'rect', x: 0, y: 0, width: geom.width, height: geom.height,
        stroke: 0, fill: 'none'}]

    // Determine which branch is to be diagrammed
    const nodes = geom.channelsObj.nodesBySeq()

    // Lay the TrainTracks first
    const trackWidth = 16
    for(let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        if (node.child) {
            const year1 = node.birthYear
            const chan1 = node.channel
            const year2 = node.child.birthYear
            const chan2 = node.child.channel
            const color = geom.color(node)
            const path = trackPath(geom, year1, chan1, year2, chan2)
            els.push(trainTracksGxml(path, trackWidth, color))
        }
    }

    // Build the TrainStations second
    for(let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        const year = node.birthYear
        const chan = node.channel
        const href = '#' + Country.get(node.birthCountry)
        const gen = genLabel(node)
        const color = geom.color(node)
        let scale = 0.6
        els.push(trainStationGxml(geom, year, chan, href, gen, color, scale))
    }

    // Add signage third
    els.push({el: 'image', x: 100, y: 100, width: 500, height: 500,
        href: SamuelBevins,
        preserveAspectRation: 'xMidYMid',   // 'xMidYMid', 'meet' or 'slice'
    })
    return els
}