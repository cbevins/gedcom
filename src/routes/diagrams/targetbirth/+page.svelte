<script>
    import { idGenCount, idGenIdx, idGenSlot } from '$lib/Sylvan/class/Generations.js'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    $: label = getSylvan().people().find($subjectNameKey).label()

    $: birth = {min: 1479, max: 2021}
    $: vb = {xmin: -1000, xmax: 1000, ymin: -1000, ymax: 1000}
    $: year = {
        max: 2050,
        min: 1450,
        span: 600,
        tic: {count: 0, years: 50},
        units: {perTic: 1, perYear: 1}
    }
    $: init()

    function init() {
        // Set viewBox user units
        vb.width = vb.xmax - vb.xmin
        vb.height = vb.ymax - vb.ymin
        // First determine min and max birth years
        // Then adjust target years range
        year.min = year.tic.years * Math.trunc(birth.min / year.tic.years)
        year.max = year.tic.years * Math.trunc(birth.max / year.tic.years) + year.tic.years
        year.span = year.max - year.min
        console.log(year.min, year.max, year.span)
        year.tic.count = year.span / year.tic.years
        year.units.perYear = vb.width / (2*year.span)
        year.units.perTic = year.tic.years * year.units.perYear
        console.log('Tic count', year.tic.count, 'un/yr', year.units.perYear, 'un/tic', year.units.perTic)
    }
    
    function poly(id) {
        const gen = idGenIdx(id)        // subject gen === 0
        const segs =idGenCount(id)
        const slot = idGenSlot(id)
        const segDeg = 360 / segs
        const fromDeg = slot * segDeg
        const thruDeg = fromDeg + segDeg
        // outer
        const p0 = point((gen+1)*adelta, (gen+1)*bdelta, fromDeg)
        const p1 = point((gen+1)*adelta, (gen+1)*bdelta, thruDeg)
        // inner
        const p2 = point(gen*adelta, gen*bdelta, fromDeg)
        const p3 = point(gen*adelta, gen*bdelta, thruDeg)
        const points = [p0, p1, p3, p2]
        let d = `M ${p0[0]} ${p0[1]}`
            + ` A ${(gen+1)*adelta} ${(gen+1)*bdelta} 0 0 1 ${p1[0]} ${p1[1]}`
        if (segs > 1) {
            d += ` L ${p3[0]} ${p3[1]}`
            d += ` A ${gen*adelta} ${gen*bdelta} 0 0 0 ${p2[0]} ${p2[1]}`
            d += ` L ${p0[0]} ${p0[1]}`
        }
        return d
    }
    
    function point(yr, deg, xCenter=0, yCenter=0) {
        return [pointX(yr, deg, xCenter), pointY(yr, deg, yCenter)]
    }

    function pointX(yr, deg, xCenter=0) {
        const rad = (360-deg) * Math.PI / 180
        const a = (year.max - yr) * year.units.perYear
        return (xCenter - (a * Math.cos(rad))).toFixed(2)
    }

    function pointY(yr, deg, yCenter=0) {
        const rad = (360-deg) * Math.PI / 180
        const b = (year.max - yr) * year.units.perYear
        return (yCenter + (b * Math.sin(rad))).toFixed(2)
    }
</script>

<h3>Ancestral Birth Disc for {label}</h3>
<svg width={vb.width} height={vb.height} viewBox="{vb.xmin} {vb.ymin} {vb.width} {vb.height}">
    {#each Array(year.tic.count+1) as unused, i}
        <circle cx={0} cy={0} r={i*year.units.perTic} fill="none" stroke="black" stroke-width="1" />
        <text x={0-18} y={i * -year.units.perTic + 5}>{year.max - i * year.tic.years}</text>
        <text x={i * -year.units.perTic - 18} y={0 + 5}>{year.max - i * year.tic.years}</text>
        <text x={0-18} y={i * year.units.perTic + 5}>{year.max - i * year.tic.years}</text>
        <text x={i * year.units.perTic-18} y={0 + 5}>{year.max - i * year.tic.years}</text>
    {/each}

    {#each Array(32) as unused, i}
        <line class='axis' x1={0} y1={0} x2={pointX(1500, i*360/32)} y2={pointY(1500, i*360/32)} />
        <text class='axis' x={pointX(1500, i*360/32)} y={pointY(1500, i*360/32)}>{i*360/32}</text>
    {/each}
</svg>

<style>
    .axis {
        fill: none;
        stroke: black;
        stroke-width: 1;
        stroke-linecap: flat;
    }
    .sep {
        fill: none;
        stroke: black;
        stroke-width: 2
    }
</style>