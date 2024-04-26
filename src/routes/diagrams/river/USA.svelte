<script>
    /**
     * Returns an HTML string defining an SVG USA flag diagram
     * that must be embedded within an <svg><defs><g></g></defs></svg>
     */
    export let d

    function star5X(col) {
        const wd = d / 2 / 12
        return 2 * (col+1) * wd
    }
    
    function star5Y(row) {
        const ht = d / 2 / 11
        return 2 * (row+1) * ht
    }

    function star6X(col) {
        const wd = d / 2 / 12
        return 2 * col * wd + wd
    }
    
    function star6Y(row) {
        const ht = d / 2 / 11
        return 2 * row * ht + ht
    }

    function html() {
        const ht = d/13
        let str = ''
        // Start with a red background rectangle
        str += `<rect x="0" y="0" width="${d}" height="${d}" fill="red" stroke="black" stroke-width="0"/>`
        // Add white stripes
        for (let i=0; i<6; i++) {
            const y = 2 * i * ht + ht
            str +=`<rect x="0" width="${d}" height="${ht}" y="${y}" fill="white" stroke-width="0"></rect>`
        }
        // Add the blue canton
        str += `<rect x="0" y="0" width="${d/2}" height="${6*ht}" fill="blue" stroke-width="0"></rect>`
        // Add 5 rows of 6 stars
        for (let row=0; row<5; row++) {
            for(let col=0; col<6; col++) {
                str += `<circle cx="${star6X(col)}" cy="${star6Y(row)}" r="${d/72}" fill="white" />`
            }
        }
        // Add 4 rows of 5 stars
        for (let row=0; row<4; row++) {
            for(let col=0; col<5; col++) {
                str += `<circle cx="${star5X(col)}" cy="${star5Y(row)}" r="${d/72}" fill="white" />`
            }
        }
        return str
    }
</script>

{@html html() }
