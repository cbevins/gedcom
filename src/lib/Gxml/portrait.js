/**
 * Returns a gxml object that describes an SVG with
 * border, header, footer, left, right, and content regions
 * according to the {layout} dimensions passed to it.
 * 
 * The returned object may subsequently be given to the gxmlStr() function
 * to create the actual SVG text.
 * 
 * @param {*} layout 
 * @param {*} contentEls gxml objects describing the content region
 *  (usually a <g> element with a scale)
 * @returns A gxml object with nested gxml objects.
 */

export function portrait(layout, contentEls) {
    const {sheet, border, header, footer, left, right, content} = layout
    const factor = layout.supi / layout.scale

    // Calculate content-dependent heights and widths (inches)
    left.height = content.height
    right.height = content.height
    border.height = header.height + content.height + footer.height + 2 * border.thickness
    sheet.height = border.height + sheet.pad.t + sheet.pad.b

    border.width = sheet.width - sheet.pad.l - sheet.pad.r
    header.width = border.width - 2 * border.thickness
    footer.width = header.width
    content.width = header.width - left.width - right.width

    const sheetRect = {el: 'rect', id: 'sheet-rect',
        x: 0, y: 0,
        width: factor * sheet.width,
        height: factor * sheet.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []}

    const borderRect = {el: 'rect', id: 'border-rect',
        x: factor * sheet.pad.l,
        y: factor * sheet.pad.t,
        width: factor * border.width,
        height: factor * border.height,
        stroke: 'blue', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const headerRect = {el: 'rect', id: 'header-rect',
        x: borderRect.x + factor * border.thickness,
        y: borderRect.y + factor * border.thickness,
        width: factor * header.width,
        height: factor * header.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const leftRect = {el: 'rect', id: 'left-rect',
        x: borderRect.x + factor * border.thickness,
        y: headerRect.y + headerRect.height,
        width: factor * left.width,
        height: factor * left.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const contentG = {el: 'g', id: 'content-g',
        transform: `scale(${content.scale}, ${content.scale})`,
        els: contentEls}

    const contentRect = {el: 'svg', id: 'content-svg',
        x: borderRect.x + factor * (border.thickness + left.width),
        y: headerRect.y + headerRect.height,
        width: factor * content.width,
        height: factor * content.height,
        stroke: 'green', 'stroke-width': 5, fill: 'none',
        els: [contentG]
    }

    const footerRect = {el: 'rect', id: 'footer-rect',
        x: borderRect.x + factor * border.thickness,
        y: contentRect.y + contentRect.height,
        width: factor * footer.width,
        height: factor * footer.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const rightRect = {el: 'rect', id: 'right-rect',
        x: contentRect.x + contentRect.width,
        y: headerRect.y + headerRect.height,
        width: factor * right.width,
        height: factor * right.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const topSvg = {el: 'svg',  xmlns: "http://www.w3.org/2000/svg",
        width: factor * sheet.width,
        height: factor * sheet.height,
        els: [sheetRect, borderRect, headerRect, footerRect, leftRect, rightRect, contentRect]}

    return topSvg
}
