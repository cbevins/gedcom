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

export function imageLayout(spec, contentSvgWidth, contentSvgHeight, scale=1, portrait=true) {
    const layout = {
        portrait: portrait, // if FALSE, rotated 90 degrees
        scale: scale,    // when used, is applied against the entire toplevel SVG
        spec: spec,     // the layout spec is in inches
        supi: 100,      // SVG units per specification inch
    }
    layout.factor = layout.supi / layout.scale
    const imageWidth = layout.factor * spec.sheetWd
    const imageScale = imageWidth / contentSvgWidth
    const imageHeight = imageScale * contentSvgHeight

    const nothing = {x: 0, y: 0, width: 0, height: 0, label: ''}
    layout.sheet = {...nothing, width: imageWidth, height: imageHeight, pad: {t: 0, b: 0, l: 0, r: 0}}
    layout.border = {...nothing, thickness: 0}
    layout.header = {...nothing}
    layout.footer = {...nothing}
    layout.left = {...nothing}
    layout.right = {...nothing}

    layout.content = {
        label: 'CONTENT',
        x: 0,
        y: 0,
        height: imageScale * contentSvgHeight,
        scale: imageScale,
        width: imageScale * contentSvgWidth,
        nativeHt: contentSvgHeight,
        nativeWd: contentSvgWidth
    }
    return layout
}
