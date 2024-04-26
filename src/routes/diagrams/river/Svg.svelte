<script>
    import Background from './Background.svelte'
    import Header from './Header.svelte'
    import Tracks from './Tracks.svelte'
    import TrackNames from './TrackNames.svelte'
    import TrackStations from './TrackStations.svelte'

    export let channels
    export let factor

    // Apply the scaling factor just once, right here
    $: lineWidth = factor * 20      // channel/track/line width in ViewBox units
    $: radius = factor * 20         // station/circle radius in ViewBox units
    $: fontSize = factor * 24       // channel Person name font size
    $: xPerYear = factor * 24       // x units per year in the ViewBox
    $: yPerChan = factor * 72       // y units per channel/track in the ViewBox

    $: subject = channels.rootPerson()
    $: geom = setGeometry(channels)

    function setGeometry() {
        const grid = {
            xPerYear: xPerYear,
            yPerChan: yPerChan,
            yearsPerCol: 10, // number of years between each column guide
            channels: channels.channelMaxCount()+2,
            lineWidth: lineWidth,   // channel/track line width
            lineStrokeWidth: lineWidth * 0.2,  // channel/track line width
            radius: radius,         // station/dot circle radius
            fontSize: fontSize,     
        }
        // Calculate grid first and last column values (in years)
        grid.yearMax = Math.trunc((channels.yearMax()+10) / grid.yearsPerCol) * grid.yearsPerCol
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
            return (node && node.child) ? this.yearX((node.birthYear + node.child.birthYear) / 2) : 0
        }
        // Function that returns y-coordinate for name label
        grid.nameY = function (node) { return node ? this.chanY(node.channel) - this.lineWidth : 0 }

        // Calculate the ViewBox
        const vb = {
            height: grid.channels * grid.yPerChan,
            width: grid.xPerYear * grid.yearSpan
        }
        // console.log('Svg.svelte grid=', grid)
        return {grid: grid, vb: vb}
    }
</script>

<Header channels={channels} {geom} />

<svg xmlns="http://www.w3.org/2000/svg"
    width={geom.vb.width} height={geom.vb.height}
    viewBox="0, 0, {geom.vb.width}, {geom.vb.height}" transform="scale(1)">
    
    <!-- EXPERIMENTAL!!! Let's define the pattern -->
    <!-- The width and height should be double the size of a single checker -->
    <pattern id="pattern-tracks" x="0" y="0"
        width={geom.grid.lineWidth} height={geom.grid.lineWidth} patternUnits="objectBoundingBox">
        <!-- Two instances of the same checker, only positioned apart on the `x` and `y` axis -->
        <!-- We will define the `fill` in the CSS for flexible use -->
        <rect class="tracks" x={10} y={10} width={80} height={80} fill="white" />
    </pattern>

    <Background {geom} />
    <Tracks {channels} {geom} />
    <TrackStations {channels} {geom} />
    <TrackNames {channels} {geom} />
</svg>

<style>
    .dot {
        fill: red;
        stroke: black;
        stroke-width: 1;
    }
</style>
