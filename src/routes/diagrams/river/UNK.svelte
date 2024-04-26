<script>
    /**
     * Returns an HTML string defining an SVG plain gray flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d
    function html() {
        // Just a gray background
        return `<rect x="0" y="0" width="${d}" height="${d}" fill="gray" stroke="black" stroke-width="0"/>`
    }
</script>

{@html html() }
