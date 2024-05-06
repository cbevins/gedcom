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

export function portraitGxml(layout, contentEls) {
    const {sheet, border, header, footer, left, right, content} = layout

    const sheetRect = {el: 'rect', id: 'sheet-rect',
        x: sheet.x,
        y: sheet.y,
        width: sheet.width,
        height: sheet.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []}

    const borderRect = {el: 'svg', id: 'border-svg',
        x: border.x,
        y: border.y,
        width: border.width,
        height: border.height,
        els: []
    }

    const headerRect = {el: 'rect', id: 'header-rect',
        x: header.x,
        y: header.y,
        width: header.width,
        height: header.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const leftRect = {el: 'rect', id: 'left-rect',
        x: left.x,
        y: left.y,
        width: left.width,
        height: left.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const contentG = {el: 'g', id: 'content-g',
        transform: `scale(${content.scale}, ${content.scale})`,
        els: contentEls}

    const contentSvg = {el: 'svg', id: 'content-svg',
        x: content.x,
        y: content.y,
        width: content.width,
        height: content.height,
        stroke: 'green', 'stroke-width': 20, fill: 'none',
        els: [contentG]
    }

    const footerRect = {el: 'rect', id: 'footer-rect',
        x: footer.x,
        y: footer.y,
        width: footer.width,
        height: footer.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const rightRect = {el: 'rect', id: 'right-rect',
        x: right.x,
        y: right.y,
        width: right.width,
        height: right.height,
        stroke: 'red', 'stroke-width': 5, fill: 'none',
        els: []
    }

    const topSvg = {el: 'svg',  xmlns: "http://www.w3.org/2000/svg",
        width: sheet.width,
        height: sheet.height,
        els: [sheetRect, borderRect, headerRect, footerRect, leftRect, rightRect, contentSvg]}

    return topSvg
}
