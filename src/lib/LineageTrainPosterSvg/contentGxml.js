import { flagTableGxml } from './flagLegendGxml.js'
import { northernEuropeGxml } from './northernEuropeGxml.js'
import { timelineGxml } from './timelineGxml.js'
import { trackNameGxml } from './trackNameGxml.js'
import { trainStationGxml } from './trainStationGxml.js'
import { trainTracksGxml } from './trainTracksGxml.js'
import { Countries } from './Countries.js'

// import { gridGxml } from './gridGxml.js'
// import SamuelBevins from '$lib/LineageTrainPosterSvg/Samuel Bevins.jpg'
import GB from '$lib/data/maps/edited/gb.svg'
import LadyLiberty from '$lib/images/ladyLiberty.jpg'
import NoE from '$lib/images/country/NorthEurope_NatGeo.png'

function addGreatBritain(x, y, width, height, opacity=1) {
    return {el: 'image', x: x, y: y, width: width, height: height,
        href: GB, opacity: opacity, preserveAspectRation: 'xMidYMid'}
}

function addNodeImage(geom, node, imageRef, opacity=1) {
    const ht = 2 * geom.radius
    return {el: 'image',
        x: (node.x + node.child.x) / 2 - ht / 2,
        y: node.y - ht - (2 * 1.6 * 1.5 * geom.fontSize),
        width: ht, height: ht,
        href: imageRef, opacity: opacity, preserveAspectRation: 'xMidYMid'}
}

function findNameKey(nodes, nameKey) {
    for (let i=0; i<nodes.length; i++) {
        if (nodes[i].person.nameKey() === nameKey) return nodes[i]
    }
    return null
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

function trackPath(geom, x1, y1, x2, y2) {
    const r = geom.radius / 2
    if (y1 === y2) {
        return `M ${x1} ${y1} L ${x2-r} ${y1} L ${x2} ${y2}`
    } else if (y1 > y2) {
        return `M ${x1} ${y1} L ${x2-r} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y1-r} L ${x2} ${y2}`
    } else {
        return `M ${x1} ${y1} L ${x2-r} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1+r} L ${x2} ${y2}`
    }
}

function countries(nodes) {
    const locs = new Map()  // birthCountry() => count
    nodes.forEach((node) => {
        let key = node.person.birthCountry()
        if (key==='' || key===null || key === 'unknown country')
            key = 'Unknown'
        if (!locs.has(key)) locs.set(key, 0)
        locs.set(key, locs.get(key)+1)
    })
    return locs
}

function countryStates(nodes) {
    const locs = new Map()
    nodes.forEach((node) => {
        const key = node.person.birthCountry()+','+node.person.birthState()
        if (!locs.has(key)) locs.set(key, 0)
        locs.set(key, locs.get(key)+1)
    })
    return locs
}

export function contentGxml(nodes, geom, settings) {
    // 1: Upper Timeline
    let main = timelineGxml(geom, settings.upperTimeline, settings.lowerTimeline,
        settings.scale)

    // 2: TrainTracks
    const trackWidth = 16
    for(let i=1; i<nodes.length; i++) {
        const node = nodes[i]
        const color = geom.color(node)
        if (node.child) {
            const path = trackPath(geom, node.x, node.y, node.child.x, node.child.y)
            main.push(trainTracksGxml(path, trackWidth, color))
        }
    }

    // 3: TrainStations
    // [x,y] are for the upper-left corner of the TrainStation <svg> element,
    // NOT for the center, so translate it based on the station scale and rowHt
    const offset = geom.stationScale * geom.rowHt / 2
    for(let i=1; i<nodes.length; i++) {
        const node = nodes[i]
        const flagRef = '#' + Countries.get(node.birthCountry).flag
        const color = geom.color(node)
        main.push(trainStationGxml(node.x-offset, node.y-offset,
            flagRef, node.birthYear, genLabel(node), color, geom.stationScale))
    }

    // 4: Track names / signage
    for(let i=1; i<nodes.length; i++) {
        main.push(trackNameGxml(geom, nodes[i]))
    }

    // 5: Special handling for subject and siblings
    main = main.concat(subjectGxml(nodes, geom, trackWidth))

    // 6: Map of Great Britain (example of adding SVG image)
    main.push(addGreatBritain(-380, 100, 2000, 2000))

    // 7: Map of Northern Europe
    // (Example of adding an SVG that scales and marks up a jpg)
    main.push(northernEuropeGxml(350, 7800, 1500))

    // 8: Node-specific images
    const hh = findNameKey(nodes, 'HannahHunter1753')
    main.push(addNodeImage(geom, hh, LadyLiberty))

    // 9: Get/report birth country-state frequency occurrences
    const smap = countryStates(nodes)
    const sar = Array.from(smap).sort()
    // sar.forEach((state) => console.log(state[0]))

    // 10: Flag legend
    const cmap = countries(nodes)
    const ar = Array.from(cmap).sort()
    main.push(flagTableGxml(ar, 100, 200, 100, 0.5))
    return main
}

// Adds subject and siblings
function subjectGxml(nodes, geom, trackWidth) {
    // First get siblings and their birth ranges
    const subject = nodes[0]
    const children = subject.mother.person.children()
    let yearMin = 9999
    let yearMax = 0
    let subjectIdx = 0
    for(let i=0; i<children.length; i++) {
        const child = children[i]
        yearMin = Math.min(yearMin, child.birthYear())
        yearMax = Math.max(yearMax, child.birthYear())
        if (child === nodes[0].person) subjectIdx = i
    }

    // Since children[] is an array of *Person*s, not *node*s,
    // we need to assign x-y coordinates and birth country
    const offset = geom.stationScale * geom.rowHt / 2
    const els = []
    for(let i=0; i<children.length; i++) {
        const child = children[i]
        const birthYear = child.birthYear()
        const x1 = geom.yearX(birthYear)

        let endYear = child.deathYear()
        endYear = endYear ? endYear : geom.yearMax
        const x2 = geom.yearX(endYear)

        const y = subject.y + (i - subjectIdx) * geom.rowHt
        
        // train tracks
        const color = child.isFemale() ? geom.femaleColor : geom.maleColor
        const path = `M ${subject.x} ${y+offset} L ${x2} ${y+offset}`
        els.push(trainTracksGxml(path, trackWidth, color))

        // train names and signage
        els.push({el: 'text',
            x: x1 + offset,
            y: y - 2 * geom.fontSize + geom.rowHt / 2,
            'text-anchor': "start", 'font-family': "sans-serif",
            'font-weight': "bold",
            'font-size': 1.5 * geom.fontSize,
            els: [{el: 'inner', content: child.fullName()}]
        })

        // train stations
        const birthCountry = child.birthCountry()
        const flagRef = '#' + Countries.get(birthCountry).flag
        els.push(trainStationGxml(x1-offset, y, flagRef, birthYear,
            'Sibling', color, geom.stationScale))
    }
    return els
}
