<script>
    export let content
    $: channels = content.channels
    $: geom = content.geom

    $: scale = 2 * geom.radius / 100
    const Country = new Map([
        ['', 'UNK'],
        ['Canada', 'CAN'],
        ['England', 'ENG'],
        ['France', 'FRA'],
        ['Germany', 'GER'],
        ['Ireland', 'IRE'],
        ['Netherlands', 'NET'],
        ['Norway', 'NOR'],
        ['Scotland', 'SCO'],
        ['Sweden', 'SWE'],
        ['USA', 'USA'],
        ['Wales', 'WAL'],
    ])

    // Returns a gender-based class name
    function country(node) { return Country.get(node.birthCountry) }
    function href(node) { return '#' + Country.get(node.birthCountry)}
    function x(node) { return geom.yearX(node.birthYear) - geom.radius }
    function y(node) { return geom.chanY(node.channel) - geom.radius }
</script>

{#each channels.nodesBySeq() as node, i}
    <use x={x(node)/scale}
            y={y(node)/scale}
            xlink:href={href(node)}
            filter="url(#flag-lighting)"
            clip-path="url(#flag-clipper)"
            transform="scale({scale})"
    /> 
    
    <circle
            cx={geom.yearX(node.birthYear)}
            cy={geom.chanY(node.channel)}
            r={geom.radius}
            stroke={geom.color(node)}
            stroke-width={4 / geom.scale}
            fill="none" />

    <text x={geom.yearX(node.birthYear)}
            y={geom.chanY(node.channel) + 1.6 * geom.radius}
            font-size={geom.fontSize}
            text-anchor="middle"
            font-family="sans-serif"
            font-weight="lighter">
        {node.birthYear}
    </text>

    <text x={x(node) + geom.radius}
        y={y(node) - 0.2 * geom.radius}
        text-anchor="middle"
        font-family="sans-serif"
        font-weight="lighter"
        font-size={geom.fontSize}>
        {country(node)}
    </text>
{/each}
