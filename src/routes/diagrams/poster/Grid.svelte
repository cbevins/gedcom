<script>
    export let width
    export let height

    const inner = {x: 200, y: 200, wd: 200, ht: 200,
        fill: "green", stroke: "red", strokeWd: 1}

    const outer = {x: 0, y: 0, wd: 825, ht: 1015,
        fill: "blue", stroke: "yellow", strokeWd: 1}

    const tr0 = "translate(0, 0) scale(1) rotate(0)"
    const tr1 = "translate(200, -50) scale(0.5) rotate(45)"
    const tr2 = "translate(200, -50) scale(0.5) rotate(90)"

</script>

<svg width={width} height={height}>
    <g id="content" transform={tr0}>
        <svg id="outer" x={outer.x} y={outer.y} width={outer.wd} height={outer.ht}>
            <rect x="0" y="0" width={outer.wd} height={outer.ht}
            fill={outer.fill} stroke={outer.stroke} />
            <circle cx="50" cy="50" r="50" fill="yellow" />
            <text x="50" y="50">Outer</text>
        </svg>

        <svg id="inner" x={inner.x} y={inner.y}>
            <rect x="0" y="0" width={inner.wd} height={inner.ht}
            fill={inner.fill} stroke={inner.stroke} />
            <circle cx="50" cy="50" r="50" fill="red" />
            <text x="50" y="50">Inner</text>
        </svg>
    </g>
</svg>
