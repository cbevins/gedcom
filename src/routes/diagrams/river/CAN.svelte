<script>
    /**
     * Returns an HTML string defining an SVG Canada tri-color flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d
    function html() {
        // Just a white background
        let str= `<rect x="0" y="0" width="${d}" height="${d}" fill="white" stroke="black" stroke-width="0"/>`
        str += `<rect x="0" y="0" width="${0.25*d}" height="${d}" fill="red" />`
        str += `<rect x="${0.75*d}" y="0" width="${0.25*d}" height="${d}" fill="red" />`
        return str
    }
</script>

{@html html() }
