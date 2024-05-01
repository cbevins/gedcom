/**
 * 
 * @param {*} layout Layout dimensions in *INCHES*
 */
export function posterLayout(layout) {
    const upi = layout.upi

    // 'sheet' represents the printable surface
    const sheetHt = layout.sheet.pad.t + layout.border.thickness + layout.header.ht
        + layout.content.ht + layout.footer.ht + layout.border.thickness + layout.sheet.pad.b
    const sheet = {
        label: 'SHEET',
        scale: layout.scale,
        upi: upi,                       // SVG units per inch
        fontSize: layout.fontSize,      // 'standard' font size
        x: 0,                           // upper left on the browser or sheet
        y: 0,                           // upper left on the browser or sheet
        wd: upi * layout.sheet.wd,      // sheet width (SVG units)
        ht: upi * sheetHt,              // sheet height (SVG units)
        tpad: upi * layout.sheet.pad.t, // padding between sheet top edge and border (SVG units)
        bpad: upi * layout.sheet.pad.b, // padding between sheet bottom edge and border (SVG units)
        lpad: upi * layout.sheet.pad.l, // padding between sheet left edge and border (SVG units)
        rpad: upi * layout.sheet.pad.r, // padding between sheet right edge and border (SVG units)
        rotate: 0,
        scale: 1,
    }

    // 'border' is nested inside 'sheet'
    const border = {
        label: 'BORDER',
        x: sheet.lpad,
        y: sheet.tpad,
        wd: sheet.wd - sheet.lpad - sheet.rpad,     // border *rect* width
        ht: sheet.ht - sheet.tpad - sheet.bpad,     // border *rect* height
        thickness: upi * layout.border.thickness,   // border line thickness
        dashArray: layout.border.dashArray,         // border line path dasharray
        fontSize: layout.fontSize,                  // 'standard' font size
    }

    // 'header', 'footer', 'left', 'right', and 'grid'
    // are all sibling SVGs nested under the 'border'
    // so their coordinates are relative to the 'border'
    const header = {
        label: 'HEADER',
        x: border.thickness,
        y: border.thickness,
        wd: border.wd - 2 * border.thickness,
        ht: upi * layout.header.ht,
        fontSize: layout.fontSize,                  // 'standard' font size
    }

    const footer = {
        label: 'FOOTER',
        x: border.thickness,
        y: border.ht - border.thickness - upi * layout.footer.ht,
        wd: border.wd - 2 * border.thickness,
        ht: upi * layout.footer.ht,
        fontSize: layout.fontSize,                  // 'standard' font size
    }

    const left = {
        label: 'LEFT',
        x: border.thickness,
        y: border.thickness + header.ht,
        wd: upi * layout.left.wd,
        ht: border.ht - 2 * border.thickness - header.ht - footer.ht,
        fontSize: layout.fontSize,                  // 'standard' font size
    }

    const right = {
        label: 'RIGHT',
        x: border.thickness + header.wd - upi * layout.right.wd,
        y: border.thickness + header.ht,
        wd: upi * layout.right.wd,
        ht: border.ht - 2 * border.thickness - header.ht - footer.ht,
        fontSize: layout.fontSize,                  // 'standard' font size
    }

    const content = {
        label: 'CONTENT',
        x: border.thickness + left.wd,
        y: border.thickness + header.ht,
        wd: border.wd - 2 * border.thickness - left.wd - right.wd,
        ht: upi * layout.content.ht,
        scale: layout.scale,
        fontSize: layout.fontSize,                  // 'standard' font size
    }

    layout.guides.fontSize = layout.fontSize
    return {sheet: sheet, border: border,
        header: header, footer: footer, left: left, right: right,
        content: content, guides: layout.guides
    }
}