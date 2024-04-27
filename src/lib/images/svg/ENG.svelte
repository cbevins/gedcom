<script>
    /**
     * Returns an HTML string defining an SVG St George's Cross flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d
    function html() {
        const mid = d / 2
        const wd = 0.2 * d
        let str = ''
        // Start with a white background rectangle
        str += `<rect x="0" y="0" width="${d}" height="${d}" fill="white" stroke="black" stroke-width="0"/>`
        // Add vertical and horizonatl stripes
        str += `<line x1="${mid}" y1="0" x2="${mid}" y2="${d}" stroke="red" stroke-width="${wd}" />`
        str += `<line x1="0" y1="${mid}" x2="${d}" y2="${mid}" stroke="red" stroke-width="${wd}" />`
        return str
    }
</script>

{@html html() }
