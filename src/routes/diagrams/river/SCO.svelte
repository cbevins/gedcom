<script>
    /**
     * Returns an HTML string defining an SVG SCotland ST. Andrew's cross flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d
    function html() {
        // Start with a blue background
        let str = `<rect x="0" y="0" width="${d}" height="${d}" fill="#005eb8" stroke="black" stroke-width="0"/>`
        // Add St. Andrew's cross in white
        const wd = 0.2 * d
        str += `<line x1="${0}" y1="0" x2="${d}" y2="${d}" stroke="white" stroke-width="${wd}" />`
        str += `<line x1="${0}" y1="${d}" x2="${d}" y2="0" stroke="white" stroke-width="${wd}" />`
        return str
    }
</script>

{@html html() }
