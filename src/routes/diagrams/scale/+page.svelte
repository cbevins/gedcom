<script>
    // console.log('RUNNING src/routes/diagrams/scale')
    
    // 36" wide with variable height
    const portrait = {
        x: 100, y: 100,     // upper left on the browser or sheet
        wd: 1000, ht: 1000, scale: 1,
        rotate: 0,
        fill: "#aaaaaa", stroke: "red", strokeWd: 2 }

    const landscape = {...portrait, rotate: 90}

    // const sheet = portrait
    const sheet = landscape

    const border = {x: 20, y: 20, wd: 960, ht: 960,
        fill: "#999999", stroke: "red", strokeWd: 1}

    const header = {x: 20, y: 20, wd: 920, ht: 60,
        fill: "#777777", stroke: "red", strokeWd: 1}

    const footer = {x: 20, y: 920, wd: 920, ht: 40,
        fill: "#777777", stroke: "red", strokeWd: 4}

    const left = {x: 20, y: 80, wd: 100, ht: 840,
        fill: "#777777", stroke: "red", strokeWd: 4}

    const right = {x: 840, y: 80, wd: 100, ht: 840,
        fill: "#777777", stroke: "red", strokeWd: 4}

    const grid = {x: 120, y: 80, wd: 720, ht: 840,
        fill: "green", stroke: "red", strokeWd: 4}

    const inner = {x: 200, y: 200, wd: 200, ht: 200,
        fill: "green", stroke: "red", strokeWd: 1}

    const outer = {x: 100, y: 100, wd: 750, ht: 500,
        fill: "blue", stroke: "yellow", strokeWd: 1}

</script>

<svg id="sheet"
        width={sheet.wd} height={sheet.ht}
        transform="translate({sheet.x}, {sheet.y}) scale(1) rotate({sheet.rotate})">
    <rect x="0" y="0" width={sheet.wd} height={sheet.ht}
            fill={sheet.fill} stroke={sheet.stroke} />
    <text x="20" y="20">SHEET</text>

    <svg id="border" x={border.x} y={border.y} width={border.wd} height={border.ht}>
        <rect x="0" y="0" width={border.wd} height={border.ht}
            fill={border.fill} stroke={border.stroke} />
        <text x="20" y="20">BORDER</text>

    <svg id="header" x={header.x} y={header.y} width={header.wd} height={header.ht}>
        <rect x="0" y="0" width={header.wd} height={header.ht}
            fill={header.fill} stroke={header.stroke} />
        <text x="460" y="40"
            text-anchor="middle" font-family="sans-serif" font-weight="lighter"
            font-size=32>HEADER</text>
    </svg>

    <svg id="footer" x={footer.x} y={footer.y} width={footer.wd} height={footer.ht}>
        <rect x="0" y="0" width={footer.wd} height={footer.ht}
            fill={footer.fill} stroke={footer.stroke} />
        <text x="460" y="30"
            text-anchor="middle" font-family="sans-serif" font-weight="lighter"
            font-size=24>FOOTER</text>
    </svg>

    <svg id="left" x={left.x} y={left.y} width={left.wd} height={left.ht}>
        <rect x="0" y="0" width={left.wd} height={left.ht}
            fill={left.fill} stroke={left.stroke} />
        <text x={left.wd/2} y={left.ht/2}
            text-anchor="middle" font-family="sans-serif" font-weight="lighter"
            font-size=12>LEFT</text>
    </svg>

    <svg id="right" x={right.x} y={right.y} width={right.wd} height={right.ht}>
        <rect x="0" y="0" width={right.wd} height={right.ht}
            fill={right.fill} stroke={right.stroke} />
        <text x={right.wd/2} y={right.ht/2}
            text-anchor="middle" font-family="sans-serif" font-weight="lighter"
            font-size=12>RIGHT</text>
    </svg>

    <svg id="grid" x={grid.x} y={grid.y} width={grid.wd} height={grid.ht}>
        <rect x="0" y="0" width={grid.wd} height={grid.ht}
            fill={grid.fill} stroke={grid.stroke} />
        <text x={grid.wd/2} y={grid.ht/2}
            text-anchor="middle" font-family="sans-serif" font-weight="lighter"
            font-size=72>GRID</text>

        <g id="content" transform="translate(200, -50) scale(0.5) rotate(45)">
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
</svg>
</svg>
