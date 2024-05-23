/**
 * Returns a layout object whose component sizes and locations have been adjusted
 * to accommodate the content, and whose dimensions are SVG units at 100 units per inch.
 * 
 * @param {*} spec Layout speficiation whose dimensions are inches
 * @param {*} contentSvgWidth Portrait content SVG width
 * @param {*} contentSvgHeight Portrait content SVG height
 * @param {number} scale Portrait content scale
 * @returns A 'layout' JSON object
 */

export function portraitLayout(spec, contentSvgWidth, contentSvgHeight, scale=1, portrait=true) {
    const layout = {
        portrait: portrait, // if FALSE, rotated 90 degrees
        scale: scale,    // when used, is applied against the entire toplevel SVG
        spec: spec,     // the layout spec is in inches
        supi: 100,      // SVG units per specification inch
    }
    layout.factor = layout.supi / layout.scale
    const factor = layout.factor
    const {t, b, l, r} = spec.sheetPad
    const sheet = {
        label: 'SHEET',
        x: 0,
        y: 0,
        height: 0,  // TBD
        width: factor * spec.sheetWd,
        pad: {t: factor * t, b: factor * b, l: factor * l, r: factor * r},
    }

    const border = {
        label: 'BORDER',
        x: sheet.pad.l,
        y: sheet.pad.t,
        height: 0,  // TBD,
        thickness: factor * spec.borderThickness,
        width: sheet.width - sheet.pad.l - sheet.pad.r
    }
    const header = {
        label: 'HEADER',
        x: border.x + border.thickness,
        y: border.y + border.thickness,
        height: factor * spec.headerHt,
        width: border.width - 2 * border.thickness
    }
    const footer = {
        label: 'FOOTER',
        x: border.x + border.thickness,
        y: 0,       // TBD = content.x + content.height
        height: factor * spec.footerHt,
        width: border.width - 2 * border.thickness
    }
    const left = {
        label: 'LEFT',
        x: border.x + border.thickness,
        y: header.y + header.height,
        height: 0,  // TBD = content.height
        width: factor * spec.leftWd
    }
    const right = {
        label: 'RIGHT',
        x: 0,       // TBD = content.x + content.width
        y: header.y + header.height,
        height: 0,  // TBD = content.height
        width: factor * spec.rightWd
    }
    const content = {
        label: 'CONTENT',
        x: border.x + border.thickness + left.width,
        y: header.y + header.height,
        height: 0,  // TBD = content.scale * contentSvgHeight
        scale: 1,   // TBD = content.width / contentSvgWidth
        width: header.width - left.width - right.width,
        nativeHt: contentSvgHeight,
        nativeWd: contentSvgWidth
    }

    // Scale content so its SVG width fits the portrait's available content width
    content.scale = content.width / contentSvgWidth
    content.height = content.scale * contentSvgHeight

    // Calculate remaining content-dependent heights and widths (inches)
    left.height = content.height
    right.height = content.height
    right.x = content.x + content.width
    footer.y = content.y + content.height
    border.height = header.height + content.height + footer.height + 2 * border.thickness
    sheet.height = border.height + sheet.pad.t + sheet.pad.b

    layout.sheet = sheet
    layout.border = border
    layout.header = header
    layout.footer = footer
    layout.left = left
    layout.right = right
    layout.content = content
    return layout
}
