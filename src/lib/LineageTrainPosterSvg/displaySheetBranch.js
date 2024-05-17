import { Channels } from '../Sylvan/class/Channels.js'
import { trainGeometry } from './trainGeometry.js'

function getChannels(subj) {
    const chan = new Channels(subj)
    // Move subject to a channel midway between father and mother
    const root = chan.rootNode()
    const f = chan.father ? chan.father.channel : 1
    const m = chan.mother ? chan.mother.channel : chan.channelMaxCount()
    root.channel = Math.trunc((f + m) / 2)
    return chan
}

export function displaySheetBranch(subject, branchNameKey) {
    const genAllowMin=0
    const genAllowMax=20   
    // Get Channels structure for this subject and select the display branch
    const channels = getChannels(subject)
    let nodes
    if (branchNameKey) {
        nodes = channels.findBranchByNameKey(branchNameKey)
    } else {
        nodes = channels.nodesBySeq()
    }
    // Determine year and channel ranges, ignore unwanted generations/years
    let yearMin = 9999
    let yearMax = 0
    let chanMin = 9999
    let chanMax = 0
    let genMin = 9999
    let genMax = 0
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