import { Channels } from '../Sylvan/class/Channels.js'
import { BevinsSheetData } from './sheetData.js'
import { trainGeometry } from './trainGeometry.js'

// Bevins-Heddens Sheet 1
export function displaySheet1(subject) {
    const channels = new Channels(subject)
    const sheet = BevinsSheetData[1]
    const nodes = channels.findBranchByNameKey(sheet.root)
    // Determine year and channel ranges, ignore unwanted generations/years
    let yearMin = 9999
    let yearMax = 0
    let chanMin = 9999
    let chanMax = 0
    const displayNodes = []
    for (let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        if (node.gen >= genAllowMin && node.gen <= genAllowMax) {
            chanMax = Math.max(chanMax, node.channel)
            chanMin = Math.min(chanMin, node.channel)
            genMax = Math.max(genMax, node.gen)
            genMin = Math.min(genMin, node.gen)
            yearMax = Math.max(yearMax, node.birthYear)
            yearMin = Math.min(yearMin, node.birthYear)
            displayNodes.push(node)
        }
    }
    console.log('Branch from', displayNodes[0].person.fullName(),
        `has ${displayNodes.length} Persons; ${yearMax-yearMin+1} Birth years (${yearMin}-${yearMax}); `
        + `${chanMax-chanMin+1} Channels (${chanMin}-${chanMax}); `
        + `${genMax-genMin+1} Generations (${genMin}-${genMax}).`)

    // Set the content geometry for the range of years and channels
    const geom = trainGeometry(yearMin, yearMax, chanMin, chanMax)
    console.log(`Display has ${displayNodes.length} Persons, `
        + `${geom.yearSpan} Years (${geom.yearMin}-${geom.yearMax}), ${geom.rows} Rows, `
        + `${geom.height} Height and ${geom.width} Width.`)

    return [nodes, geom]
}