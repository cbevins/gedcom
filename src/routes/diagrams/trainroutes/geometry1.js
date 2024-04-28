/**
 * Creates a single geom object that is passed to subcomponents
 * 
 * Uses a fixed x units per year and y units per channel/track
 * to determine the final diagram width and height
 * based upon the Channels year span and number of channels.
*/
const addYears = 30
export function geometry1(channels, factor, xPerYear, yPerChan,
        lineWidth, radius, fontSize) {
    const grid = {
        channelsClass: channels,
        factor: factor,
        xPerYear: xPerYear,
        yPerChan: yPerChan,
        yearsPerCol: 10, // number of years between each column guide
        channels: channels.channelMaxCount()+2,
        // channel/track width and stroke width
        lineWidth: lineWidth,
        lineStrokeWidth: lineWidth * 0.2,
        // confluence/station circle radius
        radius: radius,
        // channel/track label font size
        fontSize: fontSize,     
    }
    // Calculate grid first and last column values (in years)
    grid.yearMax = Math.trunc((channels.yearMax()+addYears) / grid.yearsPerCol) * grid.yearsPerCol
    grid.yearMin = Math.trunc((channels.yearMin()-1) / grid.yearsPerCol) * grid.yearsPerCol
    grid.yearSpan = grid.yearMax - grid.yearMin
    // Calculate grid number and width of year columns
    grid.cols = (grid.yearMax - grid.yearMin) / grid.yearsPerCol
    grid.xPerCol = grid.yearsPerCol * grid.xPerYear
    // Calculate grid number and height of channels/rows
    grid.rows = grid.channels
    // Function that returns x-coordinate for the year
    grid.yearX = function (year) { return (year - this.yearMin) * this.xPerYear }
    // Function that returns y-coordinate of channel index
    grid.chanY = function (chan) { return (chan+1) * this.yPerChan + this.yPerChan / 2 }
    // Function that returns x-coordinate of center point for name label
    grid.nameX = function (node) {
        // return (node && node.child) ? this.yearX((node.birthYear + node.child.birthYear) / 2) : 0
        if (node ) {
            const childYear = node.child ? node.child.birthYear : node.birthYear + addYears
            return this.yearX((node.birthYear + childYear) / 2)
        }
        return 0
    }

    // Function that returns y-coordinate for the channel/track label
    grid.nameY = function (node) {
        return node ? this.chanY(node.channel) - this.lineWidth : 0
    }

    // Calculate the ViewBox dimensions
    const vb = {
        height: grid.channels * grid.yPerChan,
        width: grid.xPerYear * grid.yearSpan
    }
    return {grid: grid, vb: vb}
}
