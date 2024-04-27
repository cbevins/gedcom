<script>
    export let channels
    export let geom

    const rad = geom.grid.radius
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
    function color(node) { return node.person.isFemale() ? "red" : "blue" }
    function country(node) { return Country.get(node.birthCountry) }
    function href(node) { return '#' + Country.get(node.birthCountry)}
    function x(node) { return geom.grid.yearX(node.birthYear) - geom.grid.radius }
    function y(node) { return geom.grid.chanY(node.channel) - geom.grid.radius }
</script>

{#each channels.nodesBySeq() as node}
    <use x={x(node)} y={y(node)} href={href(node)} filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
    <circle
        cx={geom.grid.yearX(node.birthYear)}
        cy={geom.grid.chanY(node.channel)}
        r={geom.grid.radius + 1*geom.grid.factor}
        fill="none"
        stroke={color(node)}
        stroke-width={4 * geom.grid.factor} />

    <text x={x(node)+1.5*rad} y={y(node)+1.5*rad} text-anchor="middle" font-family="sans-serif" font-weight="lighter"
        font-size={geom.grid.fontSize}>
        {country(node)}
    </text>
{/each}
