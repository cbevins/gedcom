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

export function posterGxml(layout, contentEls, borderEls=[], headerEls=[], footerEls=[], guideEls=[]) {
    const {sheet, border, header, footer, left, right, content} = layout

    const sheetSvg = {el: 'svg', id: 'sheet-svg',
        x: sheet.x,
        y: sheet.y,
        width: sheet.width,
        height: sheet.height,
        els: []}

    const guidesSvg = {el: 'svg', id: 'guides-svg',
        x: sheet.x,
        y: sheet.y,
        width: sheet.width,
        height: sheet.height,
        els: guideEls}

    const borderSvg = {el: 'svg', id: 'border-svg',
        x: border.x,
        y: border.y,
        width: border.width,
        height: border.height,
        els: borderEls
    }

    const headerSvg = {el: 'svg', id: 'header-svg',
        x: header.x,
        y: header.y,
        width: header.width,
        height: header.height,
        els: headerEls
    }

    const leftSvg = {el: 'svg', id: 'left-svg',
        x: left.x,
        y: left.y,
        width: left.width,
        height: left.height,
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
        els: [contentG]
    }

    const footerSvg = {el: 'svg', id: 'footer-svg',
        x: footer.x,
        y: footer.y,
        width: footer.width,
        height: footer.height,
        els: footerEls
    }

    const rightSvg = {el: 'svg', id: 'right-svg',
        x: right.x,
        y: right.y,
        width: right.width,
        height: right.height,
        els: []
    }

    const topSvg = {el: 'svg',  xmlns: "http://www.w3.org/2000/svg",
        width: sheet.width,
        height: sheet.height,
        els: [sheetSvg, borderSvg, headerSvg, footerSvg, leftSvg, rightSvg, contentSvg, guidesSvg]}

    return topSvg
}
