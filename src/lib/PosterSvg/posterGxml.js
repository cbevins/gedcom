/**
 * Returns a gxml object that describes an SVG with a poster layout containing a
 * border, header, footer, left, right, and content regions
 * according to the {layout} dimensions passed to it.
 * 
 * The returned object may subsequently be given to the gxmlStr() function
 * to create the actual SVG text.
 * 
 * @param {*} layout 
 * @param {*} contentEls Array of gxml objects defining the content region elements
 * @param {*} preambleEls Array of gxml objects defining svg preamble such as <defs>
 * @param {*} borderEls Array of gxml objects defining the border region elements
 * @param {*} headerEls Array of gxml objects defining the header region elements
 * @param {*} footerEls Array of gxml objects defining the footer region elements
 * @param {*} guideEls Array of gxml objects defining the guidelines elements
 * @returns An array with 1 gxml object top-level SVG with nested gxml region objects.
 */

export function posterGxml(layout, contentEls, preambleEls=[], borderEls=[],
        headerEls=[], footerEls=[], guideEls=[]) {
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

    const all = [preambleEls, sheetSvg, borderSvg, headerSvg, footerSvg, leftSvg, rightSvg, contentSvg, guidesSvg]

    let topSvg
    if (layout.portrait) {
        topSvg = {el: 'svg',  xmlns: "http://www.w3.org/2000/svg",
            width: sheet.width,
            height: sheet.height,
            els: all}
    } else {
        topSvg = {el: 'svg',  xmlns: "http://www.w3.org/2000/svg",
            width: sheet.height,
            height: sheet.width,
            els: [{el: 'g', transform: `translate(${sheet.height},0) rotate(90)`, els: all}]}
    }
    return [topSvg]
}
