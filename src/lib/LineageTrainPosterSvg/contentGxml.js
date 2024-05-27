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

// NOTE - station x,y are for upper left corner; ADJUST FOR CENTER
function trackPath(geom, year1, chan1, year2, chan2) {
    const x1 = geom.yearX(year1)
    const y1 = geom.chanY(chan1)
    const x2 = geom.yearX(year2)
    const y2 = geom.chanY(chan2)
    const r = geom.radius / 2
    if (y1 === y2) {
        return `M ${x1} ${y1} L ${x2-r} ${y1} L ${x2} ${y2}`
    } else if (y1 > y2) {
        return `M ${x1} ${y1} L ${x2-r} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y1-r} L ${x2} ${y2}`
    } else {
        return `M ${x1} ${y1} L ${x2-r} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y1+r} L ${x2} ${y2}`
    }
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

export function contentGxml(channels, nodes, geom, settings) {
    let main = timelineGxml(geom, settings.upperTimeline, settings.lowerTimeline,
        settings.scale)

    // 1: Lay the TrainTracks
    const trackWidth = 16
    for(let i=1; i<nodes.length; i++) {
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
    for(let i=1; i<nodes.length; i++) {
        const node = nodes[i]
        const year = node.birthYear
        // [x,y] are for the upper-left corner of the TrainStation <svg> element,
        const chan = node.channel
        // NOT for the center, so translate it based on the station scale and rowHt
        const x = geom.yearX(year) - geom.stationScale * geom.rowHt / 2
        const y = geom.chanY(chan) - geom.stationScale * geom.rowHt / 2
        const flagRef = '#' + Countries.get(node.birthCountry).flag
        const gen = genLabel(node)
        const color = geom.color(node)
        main.push(trainStationGxml(x, y, flagRef, year, gen, color, geom.stationScale))
    }

    // 3: Add track names / signage
    let hannahHunter = null
    for(let i=1; i<nodes.length; i++) {
        const node = nodes[i]
        main.push(trackNameGxml(geom, node))
        if (node.person.nameKey() === 'HannahHunter1753') hannahHunter = node
    }
    // console.log('HannahHunter', hannahHunter)

    // 4: Special handling for subject and siblings
    main = main.concat(subjectGxml(nodes, geom, trackWidth))

    // Example of adding an SVG map
    main.push({el: 'image', x: -400, y: 100, width: 2000, height: 2000,
        href: GB,
        // opacity: 0.3,
        preserveAspectRation: 'xMidYMid',   // 'xMidYMid', 'meet' or 'slice'
    })

    // Example of adding an SVG that marks up a map image and scales
    main.push(northernEuropeGxml(350, 2100, 500))

    // Example of adding an image
    main.push({el: 'image',
        x: geom.yearX(hannahHunter.birthYear+8),
        y: geom.chanY(hannahHunter.channel-1.2),
        width: 2*geom.radius, height: 2*geom.radius,
        href: LadyLiberty,
        opacity: 1,
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

// Adds subject and siblings
function subjectGxml(nodes, geom, trackWidth) {
    // Step 1 - discovery phase
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

    // Step 2 - diagramming phase
    const els = []
// console.log(`Subject is child ${subjectIdx}`)
// console.log(`Children were born from ${yearMin} - ${yearMax}`)
    for(let i=0; i<children.length; i++) {
        const child = children[i]
        const chan = subject.channel + (i - subjectIdx) 
        const year = child.birthYear()
        const birthCountry = child.birthCountry()
        const x = geom.yearX(year) - geom.stationScale * geom.rowHt / 2
        const y = geom.chanY(chan) - geom.stationScale * geom.rowHt / 2
        const flagRef = '#' + Countries.get(birthCountry).flag
        const gen = 'Sibling'
        const color = child.isFemale() ? geom.femaleColor : geom.maleColor

        // train tracks
        const x1 = geom.yearX(subject.birthYear)
        let deathYear = child.deathYear()
        deathYear = deathYear ? deathYear : geom.yearMax
        const x2 = geom.yearX(deathYear)
        let yy = y + geom.stationScale * geom.rowHt/2
        const path = `M ${x1} ${yy} L ${x2} ${yy}`
        els.push(trainTracksGxml(path, trackWidth, color))

        // train names and signage
        els.push({el: 'text',
            x: geom.yearX(year) + geom.stationScale * geom.rowHt / 2,
            y: y - 2 * geom.fontSize + geom.rowHt / 2,
            'text-anchor': "start",
            'font-family': "sans-serif",
            'font-weight': "bold",
            'font-size': 1.5 * geom.fontSize,
            els: [{el: 'inner', content: child.fullName()}]
        })

        // train stations
        els.push(trainStationGxml(x, y, flagRef, year, gen, color, geom.stationScale))
    }
    return els
}