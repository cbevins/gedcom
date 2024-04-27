<script>
    /**
     * Returns an HTML string defining an SVG Wales flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d
    function html() {
        // Just a white background
        let str= `<rect x="0" y="0" width="${d}" height="${d}" fill="green" stroke="black" stroke-width="0"/>`
        str += `<rect x="0" y="0" width="${d}" height="${0.5*d}" fill="white" />`
        return str
    }
</script>

{@html html() }
