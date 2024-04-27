<script>
    /**
     * Returns an HTML string defining an SVG Sweden flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d
    function html() {
        const mid = d / 2
        const wd = 0.2 * d
        let str = ''
        // Start with a blue background rectangle
        str += `<rect x="0" y="0" width="${d}" height="${d}" fill="#006aa7" stroke="black" stroke-width="0"/>`
        // Add vertical and horizontal stripes
        str += `<line x1="${mid}" y1="0" x2="${mid}" y2="${d}" stroke="#ffcd00" stroke-width="${wd}" />`
        str += `<line x1="0" y1="${mid}" x2="${d}" y2="${mid}" stroke="#ffcd00" stroke-width="${wd}" />`
        return str
    }
</script>

{@html html() }
