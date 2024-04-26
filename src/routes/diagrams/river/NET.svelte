<script>
    /**
     * Returns an HTML string defining an SVG Netherlands horizontal tri-color flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d
    function html() {
        // Start with a blue background
        let str = `<rect x="0" y="0" width="${d}" height="${d}" fill="white" stroke="black" stroke-width="0"/>`
        str += `<rect x="${0}" y="0" width="${d}" height="${0.33*d}" fill="#ad1d25" />`
        str += `<rect x="${0}" y="${0.67*d}" width="${d}" height="${0.33*d}" fill="#1e4785" />`
        return str
    }
</script>

{@html html() }
