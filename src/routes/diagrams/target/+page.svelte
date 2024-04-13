<script>
    import { idGenAbbr, idGenCount, idGenIdx, idGenSlot } from '$lib/Sylvan/class/Generations.js'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    $: label = getSylvan().people().find($subjectNameKey).label()

    $: xmin = -1000
    $: xmax = 1000
    $: ymin = -1000
    $: ymax = 1000
    $: width = xmax - xmin
    $: height = ymax - ymin

    // Ellipse axis increase per generation
    $: adelta = 100
    $: bdelta = 60

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

    function point(a, b, deg, xCenter=0, yCenter=0) {
        const rad = (360-deg) * Math.PI / 180
        const x = (xCenter - (a * Math.cos(rad))).toFixed(2)
        const y = (yCenter + (b * Math.sin(rad))).toFixed(2)
        return [x, y]
    }
</script>

<h3>Generational Stadium for {label}</h3>
<svg width={width} height={height} viewBox="{xmin} {ymin} {width} {height}">
    <!-- Axis -->
    <!-- <line class='axis' x1={(xmax+xmin)/2} y1={ymin} x2={(xmax+xmin)/2} y2={ymax} />
    <line class='axis' y1={(ymax+ymin)/2} x1={xmin} y2={(ymax+ymin)/2} x2={xmax} /> -->
    <!-- Segments -->
    {#each Array(1024) as unused, i}
        <path class='sep' d={poly(i)} />
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