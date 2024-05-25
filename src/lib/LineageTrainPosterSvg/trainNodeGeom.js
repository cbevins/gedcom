export function logGeom(geom) {
    const nodes = geom.nodes
    console.log('Subject', nodes[0].person.fullName(),
        `has ${nodes.length} Persons; ${geom.yearMax-geom.yearMin+1} Birth years (${geom.birthMin}-${geom.birthMax}); `
        + `${geom.channels} Channels (${geom.chanMin}-${geom.chanMax}); `
        + `${geom.gens} Generations (${geom.genMin}-${geom.genMax}).`)

    console.log(`Display has ${nodes.length} Persons, `
        + `${geom.yearSpan} Years (${geom.yearMin}-${geom.yearMax}), ${geom.rows} Rows, `
        + `${geom.height} Height and ${geom.width} Width.`)
}

// Determines year, channel, and generation ranges for the array of Channels nodes
export function nodeRanges(nodes) {
    let chanMin = 9999
    let chanMax = 0
    let genMin = 9999
    let genMax = 0
    let birthMin = 9999
    let birthMax = 0
    for (let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        birthMax = Math.max(birthMax, node.birthYear)
        birthMin = Math.min(birthMin, node.birthYear)
        chanMax = Math.max(chanMax, node.channel)
        chanMin = Math.min(chanMin, node.channel)
        genMax = Math.max(genMax, node.gen)
        genMin = Math.min(genMin, node.gen)
    }
    return [birthMin, birthMax, chanMin, chanMax, genMin, genMax]
}

export function trainNodeGeom(nodes) { // width=1000, height=2000) {
    // Preset parameters
    const addYears = 30         // number of years to add to max birth year
    const colWd = 100           // SVG units per year 
    const femaleColor = "magenta"
    const maleColor = "blue"
    const fontSize = 10
    const rowHt = 100            // SVG units per channel (in this case, 1 row is 10 years high)
    const stationScale = 0.75
    const yearsPerCol = 10      // years per column tic mark (in this case, a year is 10 SVG units wide)

    // Determine range of years, channels, generations
    const [birthMin, birthMax, chanMin, chanMax, genMin, genMax] = nodeRanges(nodes)
    const geom = {
        addYears: addYears,
        birthMax: birthMax,
        birthMin: birthMin,
        chanHt: rowHt,
        chanMax: chanMax,
        chanMin: chanMin,
        colWd: colWd,
        femaleColor: femaleColor,
        fontSize: fontSize,
        genMax: genMax,
        genMin: genMin,
        maleColor: maleColor,
        nodes: nodes,
        radius: 0.4 * rowHt,
        rows: chanMax - chanMin + 2,     // padding at top and bottom for links
        rowHt: rowHt,
        stationScale: stationScale,
        timelineHt: rowHt,
        trackWidth:  0.2 * rowHt,
        yearsPerCol: yearsPerCol,
        yearMax: Math.trunc((birthMax+addYears) / yearsPerCol) * yearsPerCol,
        yearMin: Math.trunc((birthMin-1) / yearsPerCol) * yearsPerCol,
        yearWd: colWd / yearsPerCol
    }
    // Calculate final sizes based on year and channel ranges
    geom.yearSpan = geom.yearMax - geom.yearMin
    geom.cols = geom.yearSpan / geom.yearsPerCol
    geom.width = geom.cols * geom.colWd
    geom.channels = geom.chanMax - geom.chanMin + 1
    geom.contentHt = geom.rows * geom.rowHt
    geom.height = geom.rows * geom.rowHt + 2 * geom.timelineHt
    geom.gens = geom.genMax - geom.genMin + 1
console.log(`LineageTrain is ${geom.width/100}" by ${geom.height/100}"`)

    geom.cover = {}
    const w8 = geom.height/800
    const w6 = geom.height/600
    console.log(`${w6} 6-in pages or ${w8} 8-in pages`)
    // Function that returns x-coordinate given the calendar year
    geom.yearX = function (year) { return (year - this.yearMin) * this.yearWd }
    // Function that returns y-coordinate of channel index
    geom.chanY = function (chanIdx) {
        return (chanIdx+1-geom.chanMin) * this.chanHt + geom.timelineHt
    }
    geom.color = function (node) { return node.person.isFemale() ? geom.femaleColor : geom.maleColor }
    // Function that returns an x-coordinate for the channel/track label
    geom.nameX = function (node) {
        if (node ) {
            const childYear = node.child ? node.child.birthYear : node.birthYear + this.addYears
            return this.yearX((node.birthYear + childYear) / 2)
        }
        return 0
    }
    // Function that returns a y-coordinate for the channel/track label
    geom.nameY = function (node) {
        return node ? this.chanY(node.channel) - 0.6 * geom.trackWidth : 0
    }

    return geom
}
