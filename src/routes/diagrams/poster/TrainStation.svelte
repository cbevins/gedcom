<script>
    import { countryAbbr, countryFlagHref } from './Countries.js'

    export let cx       // train station centroid x-coordinate
    export let cy       // train station centroid y-coordinate
    export let geom
    export let node

    $: scale = 2 * geom.radius / 100    // flags are in a 100x100 rectangle
    $: x = (geom.yearX(node.birthYear) - geom.radius) / scale
    $: y = (geom.chanY(node.channel) - geom.radius) / scale
    $: href = countryFlagHref(node.birthCountry)
    $: abbr = countryAbbr(node.birthCountry)
</script>

    <use x={x} y={y} xlink:href={href}
            filter="url(#flag-lighting)"
            clip-path="url(#flag-clipper)"
            transform="scale({scale})"
    /> 
    
    <circle cx={cx} cy={cy} r={geom.radius}
            stroke={geom.color(node)}
            stroke-width={4 / geom.scale}
            fill="none" />

    <text   x={cx} y={cy + 1.6 * geom.radius}
            font-size={geom.fontSize}
            text-anchor="middle"
            font-family="sans-serif"
            font-weight="lighter">
        {node.birthYear}
    </text>

    <text x={cx} y={cy - 1.2 * geom.radius}
            text-anchor="middle"
            font-family="sans-serif"
            font-weight="normal"
            font-size={geom.fontSize}>
        {abbr}
    </text>
