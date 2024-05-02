<script>
    export let content
    export let top
    export let bot

    $: geom = content.geom
    $: lineHt = geom.timeline.ht / geom.timeline.lines
    $: yUpper = {
        top: 0,
        bot: geom.timeline.ht,
        text: geom.timeline.ht 
    }
    $: yLower = {
        top: content.ht - geom.timeline.ht,
        bot: content.ht,
        text: content.ht - 3 * lineHt
    } 

    function xCol(col) { return col * geom.xPerCol }
    
    function eventInRange(event) {
        const year = event.from[0]
        return (year >= geom.yearMin && year <= geom.yearMax)
    }

    function fromX(event) { return geom.yearX(event.from[0]) }
    function thruX(event) { return geom.yearX(event.thru[0]) }

    function labelY(i, tl) {
        const offset = (1 + i % (geom.timeline.lines-1)) * lineHt
        return (tl === 0) ? yUpper.top + offset : yLower.top + offset + 0.8*lineHt
    }
</script>

<!-- Upper TimeLine Background -->
<rect x="0" y="0" width={content.wd} height={geom.timeline.ht}
    fill="gray" />

<!-- Lower TimeLine Background-->
<rect x="0" y={geom.totalHt - geom.timeline.ht} width={content.wd} height={geom.timeline.ht}
    fill="gray" />

<!-- Year labels -->
{#each Array(geom.cols) as unused, col}
    {#each [yUpper.text, yLower.text] as y }
        <text x={xCol(col)} y={y}
                text-anchor="middle"
                font-family="sans-serif"
                font-weight="lighter"
                font-size={geom.timeline.ht / geom.timeline.lines}>
            {geom.yearMin + col * geom.yearsPerCol}
        </text>
    {/each}
    <line x1={xCol(col)} y1={yUpper.bot} x2={xCol(col)} y2={yLower.top}
        stroke="gray"
        stroke-width="1"
        stroke-opacity="0.5" />
{/each}

<!-- Event labels -->
{#each [top, bot] as timeline, tl}
    {#each timeline as event, i}
    {#if eventInRange(event) }
        <line   x1={fromX(event)}
                y1={tl ? yLower.top : yUpper.bot}
                x2={fromX(event)}
                y2={labelY(i, tl)}
                line-cap="round"
                stroke="red"
                fill="none"
                stroke-opacity="0.6"
                stroke-width="{0.2 * geom.fontSize}" />

        <text   x={fromX(event)}
                y={labelY(i, tl)}
                text-anchor="left"
                font-family="sans-serif"
                font-weight="lighter"
                font-size={1.5 * geom.fontSize}>
            {event.label}
        </text>
        {/if}
    {/each}
{/each}
