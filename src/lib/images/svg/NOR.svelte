<script>
    /**
     * Returns an HTML string defining an SVG Norway flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d
    function html() {
        const mid = d / 2
        let str = ''
        // Start with a red background rectangle
        str += `<rect x="0" y="0" width="${d}" height="${d}" fill="#ba0c2f" stroke="black" stroke-width="0"/>`
        // Add vertical and horizontal white stripes
        let wd = 4 * d / 22
        str += `<line x1="${mid}" y1="0" x2="${mid}" y2="${d}" stroke="white" stroke-width="${wd}" />`
        str += `<line x1="0" y1="${mid}" x2="${d}" y2="${mid}" stroke="white" stroke-width="${wd}" />`
        // Add vertical and horizontal blue stripes
        wd = 2 * d / 22
        str += `<line x1="${mid}" y1="0" x2="${mid}" y2="${d}" stroke="#00205b" stroke-width="${wd}" />`
        str += `<line x1="0" y1="${mid}" x2="${d}" y2="${mid}" stroke="#00205b" stroke-width="${wd}" />`
        return str
    }
</script>

{@html html() }
