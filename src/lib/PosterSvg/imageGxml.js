/**
 * Returns a gxml object that describes a simple SVG with no framing
 * according to the {layout} dimensions passed to it.
 * 
 * The returned object may subsequently be given to the gxmlStr() function
 * to create the actual SVG text.
 * 
 * @param {*} layout 
 * @param {*} contentEls Array of gxml objects defining the content region elements
 * @param {*} preambleEls Array of gxml objects defining svg preamble such as <defs>
 * @param {*} guideEls Array of gxml objects defining the guidelines elements
 * @returns An array with 1 gxml object top-level SVG with nested gxml region objects.
 */

export function imageGxml(layout, contentEls, preambleEls=[], guideEls=[]) {
const {sheet, content} = layout

const sheetSvg = {el: 'svg', id: 'sheet-svg',
    x: 0, // sheet.x,
    y: 0, // sheet.y,
    width: sheet.width,
    height: sheet.height,
    els: []}

const guidesSvg = {el: 'svg', id: 'guides-svg',
    x: 0,
    y: 0,
    width: sheet.width,
    height: sheet.height,
    els: guideEls}

const contentG = {el: 'g', id: 'content-g',
    transform: `scale(${content.scale}, ${content.scale})`,
    els: contentEls}

const contentSvg = {el: 'svg', id: 'content-svg',
    x: 0,
    y: 0,
    width: content.width,
    height: content.height,
    els: [contentG]
}

const all = [preambleEls, contentSvg, guidesSvg]
    
let topSvg
if (layout.portrait) {
    topSvg = {el: 'svg',  xmlns: "http://www.w3.org/2000/svg",
        x: 0, y: 0,
        width: sheet.width,
        height: sheet.height,
        els: all}
} else {
    topSvg = {el: 'svg',  xmlns: "http://www.w3.org/2000/svg",
        x: 0, y: 0,
        width: sheet.height,
        height: sheet.width,
        els: [{el: 'g', transform: `translate(${sheet.height},0) rotate(90)`, els: all}]}
}
return [topSvg]
}
