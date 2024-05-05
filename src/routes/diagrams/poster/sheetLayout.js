/**
 * Fully hydrates a Layout specification into the return JSON object.
 * 
 * @param {*} layout A layout specification (inches) like PosterLayout36.js
 * @param {*} upi SVG units per inch
 * @param {*} scale Display scale (scale of 2 reults in half size)
 * @param {*} contentHt Height of the Content region in SVG units
 * @param {*} guideLines 
 * @param {*} guideBorders 
 * @param {*} guideLabels 
 * @returns A fully dimensioned and specified layout object.
 */
export function sheetLayout(layout, upi, contentHt, scale=1, guideLines=false, guideBorders=false, guideLabels=false) {
    // 'sheet' represents the printable surface
    const sheetHt = layout.sheet.pad.t + layout.border.thickness + layout.header.ht
        + contentHt + layout.footer.ht + layout.border.thickness + layout.sheet.pad.b
    const sheet = {
        label: 'SHEET',
        scale: scale,
        upi: upi,                               // SVG units per inch
        fontSize: layout.fontSize / scale,      // 'standard' font size
        x: 0,                                   // upper left x-coordinate on the browser or sheet
        y: 0,                                   // upper left y-coordinate on the browser or sheet
        wd: upi * layout.sheet.wd / scale,      // sheet width (SVG units)
        ht: sheetHt,                    // sheet height (SVG units)
        tpad: upi * layout.sheet.pad.t / scale, // padding between sheet top edge and border (SVG units)
        bpad: upi * layout.sheet.pad.b / scale, // padding between sheet bottom edge and border (SVG units)
        lpad: upi * layout.sheet.pad.l / scale, // padding between sheet left edge and border (SVG units)
        rpad: upi * layout.sheet.pad.r / scale, // padding between sheet right edge and border (SVG units)
        rotate: 0,
        scale: 1,
    }

    // 'border' is nested inside 'sheet'
    const border = {
        label: 'BORDER',
        x: sheet.lpad,                              // region upper left SHEET x-coordinate
        y: sheet.tpad,                              // region upper left SHEET y-coordinate
        wd: sheet.wd - sheet.lpad - sheet.rpad,     // border *rect* width
        ht: sheet.ht - sheet.tpad - sheet.bpad,     // border *rect* height
        thickness: upi * layout.border.thickness / scale,   // border line thickness
        dashArray: layout.border.dashArray,         // border line path dasharray
        fontSize: layout.fontSize / scale,          // border 'standard' font size
    }

    // 'header', 'footer', 'left', 'right', and 'grid'
    // are all sibling SVGs nested under the 'border'
    // so their coordinates are relative to the 'border'
    const header = {
        label: 'HEADER',                        // region name shown in Guide.labels
        x: border.thickness,                    // region upper left SHEET x-coordinate
        y: border.thickness,                    // region upper left SHEET y-coordinate
        wd: border.wd - 2 * border.thickness,   // region width in SVG units
        ht: upi * layout.header.ht / scale,     // region height in SVG units
        fontSize: layout.fontSize / scale,      // 'standard' font size
    }

    const footer = {
        label: 'FOOTER',                        // region name shown in Guide.labels
        x: border.thickness,                    // region upper left SHEET x-coordinate
        y: border.ht - border.thickness - upi * layout.footer.ht,   // region upper left SHEET y-coordinate
        wd: border.wd - 2 * border.thickness,   // region width in SVG units
        ht: upi * layout.footer.ht / scale,     // region height in SVG units
        fontSize: layout.fontSize / scale,      // 'standard' font size
    }

    const left = {
        label: 'LEFT',                          // region name shown in Guide.labels
        x: border.thickness,                    // region upper left SHEET x-coordinate
        y: border.thickness + header.ht,        // region upper left SHEET y-coordinate
        wd: upi * layout.left.wd / scale,       // region width in SVG units
        ht: border.ht - 2 * border.thickness - header.ht - footer.ht,   // region height in SVG units
        fontSize: layout.fontSize / scale,      // 'standard' font size
    }

    const right = {
        label: 'RIGHT',                         // region name shown in Guide.labels
        x: border.thickness + header.wd - upi * layout.right.wd,    // region upper left SHEET x-coordinate
        y: border.thickness + header.ht,        // region upper left SHEET y-coordinate
        wd: upi * layout.right.wd / scale,      // region width in SVG units
        ht: border.ht - 2 * border.thickness - header.ht - footer.ht,// region height in SVG units
        fontSize: layout.fontSize / scale,      // region 'standard' font size
    }

    const content = {
        label: 'CONTENT',                       // region name shown in Guide.labels
        x: border.thickness + left.wd,          // region upper left SHEET x-coordinate
        y: border.thickness + header.ht,        // region upper left SHEET y-coordinate
        wd: border.wd - 2 * border.thickness - left.wd - right.wd,  // region width in SVG units
        ht: contentHt,                  // region height in SVG units
        scale: scale,
        fontSize: layout.fontSize / scale,      // region 'standard' font size
    }

    const guides = {
        borders: guideBorders,
        labels: guideLabels,
        lines: guideLines,
        fontSize: layout.fontSize / scale,
    }

    return {
        sheet: sheet,
        border: border,
        header: header,
        footer: footer,
        left: left,
        right: right,
        content: content,
        guides: guides
    }
}