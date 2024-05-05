/**
 * Defines a poster layout SPECIFICATION with just the Content, Header, and Footer regions
 * and no Left or Right region.  The poster has a fixed 36" width and variable height.
 * 
 * This PosterLayout36 ia a Plain Old JSON Object that is passed to the PosterLayout constructor.
 * 
 * @param {*} upi SVG units per inch
 * @param {*} scale Display scale (scale of 2 reults in half size)
 * @param {*} contentHt Height of the Content region in SVG units
 * @param {*} guideLines 
 * @param {*} guideBorders 
 * @param {*} guideLabels 
 * @returns 
 */
export function PosterLayout36BAK(upi, scale, contentHt) {
    const layout = {
        upi: upi,
        scale: scale,
        fontSize: 12 / scale,       // 'standard' font size
        sheet: {
            wd: 36 / scale,         // large format paper width is 36"
            pad: {
                t: 0.25/scale,
                b: 0.25/scale,
                l: 0.25/scale,
                r: 0.25/scale
            }
        },
        border: {
            thickness: 0.25 / scale,
            dashArray: "50 50",
        },
        header: {
            ht: 1 / scale,
        },
        footer: {
            ht: 0.5 / scale,
        },
        left: {
            wd: 0 / scale,
        },
        right: {
            wd: 0 / scale,
        },
        content: {
            // geom: geom,
            ht: contentHt / upi / scale,
        },
    }
    return layout
}
