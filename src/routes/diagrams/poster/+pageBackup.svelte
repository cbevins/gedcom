<script>
    // All units are hundreths of an inch
    // Poster is 36" wide with variable height
    import GuideBox from './GuideBox.svelte'
    import GuideLines from './GuideLines.svelte'

    // Dimensions passed as props
    const upi = 100                 // 100 svg units per inch
    const sheetHt = 12              // sheet height (inches)
    const sheetWd = 36              // sheet width (inches)
    const sheetMargin = 0.25        // sheet margin (inches)
    const borderThickness = 0.25    // border thickness (inches)
    const headerHt = 2              // header hight (inches)
    const footerHt = 2              // footer height (inches)
    const leftWd = 2                // left box width (inches)
    const rightWd = 2               // right box width (inches)
    const guides = true             // display borders and guides

    // 'sheet' represents the printable surface
    const sheet = {
        label: 'SHEET',
        upi: upi,                   // SVG units per inch
        x: 0,                       // upper left on the browser or sheet
        y: 0,                       // upper left on the browser or sheet
        wd: upi * sheetWd,          // sheet width (SVG units)
        ht: upi * sheetHt,          // sheet height (SVG units)
        scale: 1,
        rotate: 0,
        margin: upi * sheetMargin,  // sheet margin (SVG units)
    }

    const border = {
        label: 'BORDER',
        x: sheet.margin,
        y: sheet.margin,
        wd: sheet.wd - 2*sheet.margin,      // border *rect* width
        ht: sheet.ht - 2*sheet.margin,      // border *rect* height
        thickness: upi * borderThickness,   // border line thickness
    }

    // 'header', 'footer', 'left', 'right', and 'grid'
    // are all sibling SVGs nested under the 'border'
    // so their coordinates are relative to the 'border'
    const header = {
        label: 'HEADER',
        x: border.thickness,
        y: border.thickness,
        wd: border.wd - 2 * border.thickness,
        ht: upi * headerHt,
    }

    const footer = {
        label: 'FOOTER',
        x: border.thickness,
        y: border.ht - border.thickness - footerHt,
        wd: border.wd - 2 * border.thickness,
        ht: upi * footerHt,
    }

    const left = {
        label: 'LEFT',
        x: border.thickness,
        y: border.thickness + header.ht,
        wd: upi * leftWd,
        ht: border.ht - 2 * border.thickness - header.ht - footer.ht,
    }

    const right = {
        label: 'RIGHT',
        x: border.thickness + header.wd - rightWd,
        y: border.thickness + header.ht,
        wd: upi * rightWd,
        ht: border.ht - 2 * border.thickness - header.ht - footer.ht,
    }

    const grid = {
        label: 'GRID',
        x: border.thickness + left.wd,
        y: border.thickness + header.ht,
        wd: border.wd - 2 * border.thickness - left.wd - rightWd,
        ht: border.ht - 2 * border.thickness - header.ht - footer.ht,
    }
</script>

<svg id="sheet"
        width={sheet.wd} height={sheet.ht}
        transform="translate({sheet.x}, {sheet.y}) scale({sheet.scale}) rotate({sheet.rotate})">
    <GuideBox {guides} geom={sheet} />
    <line x1="0" y1="100" x2={sheet.wd} y2="100" stroke="red" stroke-width="6" />

    <!-- 'border' nested inside 'sheet'-->
    <svg id="border" x={border.x} y={border.y} width={border.wd} height={border.ht}>
        <GuideBox {guides} geom={border} />

        <!-- 'header' nested inside 'border'-->
        <svg id="header" x={header.x} y={header.y} width={header.wd} height={header.ht}>
            <GuideBox {guides} geom={header} />
        </svg>

        <!-- 'footer' nested inside 'border'-->
        <svg id="footer" x={footer.x} y={footer.y} width={footer.wd} height={footer.ht}>
            <GuideBox {guides} geom={footer} />
        </svg>

        <!-- 'left' nested inside 'border'-->
        <svg id="left" x={left.x} y={left.y} width={left.wd} height={left.ht}>
            <GuideBox {guides} geom={left} />
        </svg>

        <!-- 'right' nested inside 'border'-->
        <svg id="right" x={right.x} y={right.y} width={right.wd} height={right.ht}>
            <GuideBox {guides} geom={right} />
        </svg>

        <!-- 'right' nested inside 'border'-->
        <svg id="grid" x={grid.x} y={grid.y} width={grid.wd} height={grid.ht}>
            <GuideBox {guides} geom={grid} />
        </svg>
    </svg>
        
    {#if guides}        
        <GuideLines {sheet} />
    {/if}
</svg>
