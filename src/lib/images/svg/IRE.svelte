<script>
    /**
     * Returns an HTML string defining an SVG Ireland tri-color flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d
    function html() {
        // Just a white background
        let str= `<rect x="0" y="0" width="${d}" height="${d}" fill="white" stroke="black" stroke-width="0"/>`
        str += `<rect x="0" y="0" width="${0.33*d}" height="${d}" fill="#009A49" />`
        str += `<rect x="${0.67*d}" y="0" width="${0.33*d}" height="${d}" fill="#ff7900" />`
        return str
    }
</script>

{@html html() }
