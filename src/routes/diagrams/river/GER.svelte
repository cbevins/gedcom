<script>
    /**
     * Returns an HTML string defining an SVG Germany horizontal tri-color flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d
    function html() {
        // Start with a red background
        let str = `<rect x="0" y="0" width="${d}" height="${d}" fill="red" stroke="black" stroke-width="0"/>`
        str += `<rect x="${0}" y="0" width="${d}" height="${0.33*d}" fill="black" />`
        str += `<rect x="${0}" y="${0.67*d}" width="${d}" height="${0.33*d}" fill="#ffcc00" />`
        return str
    }
</script>

{@html html() }
