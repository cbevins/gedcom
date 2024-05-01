/**
 * Creates a single geom object that is passed to TrainRoutes subcomponents
 * 
 * width - the total content area width (SVG units)
 * channelHt - the vertical space allocated to each channel (SVG units)
*/
export function trainGeom(channels, width, upi, scale, addYears=30) {
    const geom = {
        addYears: addYears,
        channels: channels,
        scale: scale,
        width: width,
        upi: upi
    }
    const trackWidth = 10
    //--------------------------------------------------------------------------
    // HORIZONTAL X
    //--------------------------------------------------------------------------

    // Number of years bteween each timeline
    geom.yearsPerCol = 10

    // Grid first and last column values (in years)
    geom.yearMax = Math.trunc((channels.yearMax()+addYears) / geom.yearsPerCol) * geom.yearsPerCol
    geom.yearMin = Math.trunc((channels.yearMin()-1) / geom.yearsPerCol) * geom.yearsPerCol
    geom.yearSpan = geom.yearMax - geom.yearMin
    // Horizontal SVG units per year
    geom.xPerYear = width / geom.yearSpan
    // Content columns/years
    geom.cols = (geom.yearMax - geom.yearMin) / geom.yearsPerCol
    // Content unscaled SVG units per column
    geom.xPerCol = geom.yearsPerCol * geom.xPerYear
    // Function that returns x-coordinate given the calendar year
    geom.yearX = function (year) { return (year - this.yearMin) * this.xPerYear / this.scale }
    // Function that returns a scaled x-coordinate of center point for name label
    geom.nameX = function (node) {
        // return (node && node.child) ? this.yearX((node.birthYear + node.child.birthYear) / 2) : 0
        if (node ) {
            const childYear = node.child ? node.child.birthYear : node.birthYear + addYears
            return this.yearX((node.birthYear + childYear) / 2)
        }
        return 0
    }

    //--------------------------------------------------------------------------
    // VERTICAL Y
    //--------------------------------------------------------------------------

    // Content rows/channels
    geom.rows = channels.channelMaxCount()+3
    // Vertical unscaled SVG units per channel/track
    geom.yPerChan = 6 * geom.xPerYear
    // Content height in unscaled SVG units
    geom.height = geom.rows * geom.yPerChan
    // Function that returns a scaled y-coordinate of channel index
    geom.chanY = function (chan) { return (chan+1) * this.yPerChan / this.scale + this.yPerChan / this.scale / 2 }
    // Function that returns a scaled y-coordinate for the channel/track label
    geom.nameY = function (node) { return node ? this.chanY(node.channel) - 0.6 * this.trackWidth : 0 }

    //--------------------------------------------------------------------------
    // might move these into their own components
    //--------------------------------------------------------------------------

    // channel/track width and stroke width in scaled SVG units
    geom.trackWidth =  trackWidth / geom.scale
    geom.lineStrokeWidth = 0.2 * geom.trackWidth

    // confluence/station circle radius in scaled SVG units
    geom.radius = 0.4 * geom.yPerChan / geom.scale

    // channel/track label font size in scaled SVG font units
    geom.fontSize = 10 / geom.scale

    geom.femaleTrack = "magenta"
    geom.maleTrack =  "blue"
    geom.color = function (node) {
        return node.person.isFemale() ? geom.femaleTrack : geom.maleTrack
    }
    return geom
}
