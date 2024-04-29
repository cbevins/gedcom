<script>
    export let x
    export let y

    $: sheet = { x: x, y: y, wd: 1000, ht: 1000, scale: 1,
        fill: "gray", stroke: "black", strokeWidth: 2 }

    const inner = {x: 200, y: 200, wd: 200, ht: 200,
        fill: "green", stroke: "red", strokeWd: 1}

    const outer = {x: 100, y: 100, wd: 750, ht: 500,
        fill: "blue", stroke: "yellow", strokeWd: 1}
</script>

<svg width={sheet.wd} height={sheet.ht} style="background: gray"
    transform="translate({sheet.x}, {sheet.y}) scale(1) rotate(0)">
    
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
</svg>

