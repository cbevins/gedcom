export function trainGeometry(yearMin, yearMax, chanMin, chanMax) { // width=1000, height=2000) {
    const geom = {
        addYears: 30,
        chanMin: chanMin,
        chanMax: chanMax,
        colWd: 100,
        rowHt: 50,
        yearsPerCol: 10,
    }
    
    // Grid first and last column values (in years)
    geom.yearMax = Math.trunc((yearMax+geom.addYears) / geom.yearsPerCol) * geom.yearsPerCol
    geom.yearMin = Math.trunc((yearMin-1) / geom.yearsPerCol) * geom.yearsPerCol
    geom.yearSpan = geom.yearMax - geom.yearMin
    geom.cols = geom.yearSpan / geom.yearsPerCol
    geom.yearWd = geom.colWd / geom.yearsPerCol
    geom.width = geom.cols * geom.colWd

    geom.rows = chanMax - chanMin + 2 // padding at top and bottom
    geom.chanHt = geom.rowHt
    geom.timelineHt = geom.rowHt
    geom.contentHt = geom.rows * geom.rowHt
    geom.height = geom.rows * geom.rowHt + 2 * geom.timelineHt

    geom.trackWidth =  0.2 * geom.rowHt
    geom.radius = 0.4 * geom.rowHt
    geom.fontSize = 10
    geom.femaleColor = "magenta"
    geom.maleColor = "blue"

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