import { flagLegendGxml, flagTableGxml } from './flagLegendGxml.js'
import { timelineGxml } from './timelineGxml.js'
import { trackNameGxml } from './trackNameGxml.js'
import { trainStationGxml } from './trainStationGxml.js'
import { trainTracksGxml } from './trainTracksGxml.js'
import { US_History, US_Migrations, US_Wars, World_History } from './timelineData.js'
import { Countries } from './Countries.js'

// import { gridGxml } from './gridGxml.js'
// import SamuelBevins from '$lib/LineageTrainPosterSvg/Samuel Bevins.jpg'
import GB from '$lib/data/maps/edited/gb.svg'
// import NL from '$lib/data/maps/edited/nl.svg'
// import MN from '$lib/data/maps/mapSvg/usa-mn.svg'

// NOTE - station x,y are for upper left corner; ADJUST FOR CENTER
function trackPath(geom, year1, chan1, year2, chan2) {
    const x1 = geom.yearX(year1)
    const y1 = geom.chanY(chan1)
    const x2 = geom.yearX(year2)
    const y2 = geom.chanY(chan2)
    const r = geom.radius / 2
    const path = (y1 === y2) ? `M ${x1} ${y1} L ${x2-r} ${y1} L ${x2} ${y2}`
        : `M ${x1} ${y1} L ${x2-r} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y1-r} L ${x2} ${y2}`
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
    // const main = gridGxml(geom)
    const main = timelineGxml(geom, settings.upperTimeline, settings.lowerTimeline,
        settings.scale)

    // 1: Lay the TrainTracks
    const trackWidth = 16
    for(let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        const year1 = node.birthYear
        const chan1 = node.channel
        const color = geom.color(node)
        if (node.child) {
            const year2 = node.child.birthYear
            const chan2 = node.child.channel
            // console.log(`${node.label} [${year1}, ${chan1}] to ${node.child.label} [${year2}, ${chan2}]`)
            const path = trackPath(geom, year1, chan1, year2, chan2)
            main.push(trainTracksGxml(path, trackWidth, color))
        } else {
            const path = trackPath(geom, year1, chan1, year1+geom.addYears, chan1)
            main.push(trainTracksGxml(path, trackWidth, color))
        }
    }

    // 2: build the TrainStations
    for(let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        const year = node.birthYear
        // [x,y] are for the upper-left corner of the TrainStation <svg> element,
        const chan = node.channel
        // NOT for the center, so translate it based on the station scale and rowHt
        const x = geom.yearX(year) - geom.stationScale * geom.rowHt / 2
        const y = geom.chanY(chan) - geom.stationScale * geom.rowHt / 2
        const flagRef = '#' + Countries.get(node.birthCountry)
        const gen = genLabel(node)
        const color = geom.color(node)
        main.push(trainStationGxml(x, y, flagRef, year, gen, color, geom.stationScale))
    }

    // 3: Add track names / signage
    for(let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        main.push(trackNameGxml(geom, node))
    }

    // Example of adding an image
    main.push({el: 'image', x: -400, y: 100, width: 2000, height: 2000,
        href:GB,
        // opacity: 0.3,
        preserveAspectRation: 'xMidYMid',   // 'xMidYMid', 'meet' or 'slice'
    })

    // Report country-state occurrence
    const smap = countryStates(nodes)
    const sar = Array.from(smap).sort()
    // sar.forEach((state) => console.log(state[0]))

    // Flag legend
    // main.push(flagLegendGxml(100, 200, 100, 0.5))
    const cmap = countries(nodes)
    const ar = Array.from(cmap).sort()
    main.push(flagTableGxml(ar, 100, 200, 100, 0.5))
    return main
}