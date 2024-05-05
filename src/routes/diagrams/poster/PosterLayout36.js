/**
 * Defines a poster layout SPECIFICATION with just the Content, Header, and Footer regions
 * and no Left or Right region.  The poster has a fixed 36" width and variable height.
 * 
 * This PosterLayout36 ia a Plain Old JSON Object that is passed to the PosterLayout constructor.
 */
export function PosterLayout36() {
    const layout = {
        fontSize: 12,       // 'standard' font size
        sheet: {
            wd: 36,         // large format paper width is 36"
            pad: {          // non-printable area padding
                t: 0.25,
                b: 0.25,
                l: 0.25,
                r: 0.25,
            }
        },
        border: {
            thickness: 0.25,
            dashArray: "50 50",
        },
        header: {ht: 1},
        footer: {ht: 0.5},
        left: {wd: 0},
        right: {wd: 0},
        guides:{}
    }
    return layout
}
