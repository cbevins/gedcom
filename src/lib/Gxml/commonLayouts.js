/**
 * Contains functions that return some common layouts for use with gxml.
 * All dimensions are inches.
 */

export function layoutStandardPortrait(contentSupiWidth, contentSupiHeight) {
    const layout = {
        scale: 1,
        supi: 100,      // SVG units per inch
        sheet: {
            width: 36,
            pad: {t: 1, b: 1, l: 1, r: 1}
        },
        border: {thickness: 1},
        header: {height: 3},
        footer: {height: 1},
        left: {width: 2},
        right: {width: 2},
    }
    return layoutComplete(layout, contentSupiWidth, contentSupiHeight)
}

export function layoutLineagePoster(contentSupiWidth, contentSupiHeight) {
    const layout = {
        scale: 1,
        supi: 100,      // SVG units per inch
        sheet: {
            width: 36,
            pad: {t: 0.25, b: 0.25, l: 0.25, r: 0.25}
        },
        border: {thickness: 0.25},
        header: {height: 1},
        footer: {height: 0.5},
        left: {width: 0},
        right: {width: 0},
    }
    return layoutComplete(layout, contentSupiWidth, contentSupiHeight)
}

function layoutComplete(layout, contentSupiWidth, contentSupiHeight) {
    layout.content = {
        height: 0,
        width: 0,
        original: {
            supi: {width: contentSupiWidth, height: contentSupiHeight}
        },
        scale: 1,
        supi: {height: 0, width: 0}
    }

    // Available layout width for content in inches and SVG units
    layout.content.width = layout.sheet.width - layout.sheet.pad.l - layout.sheet.pad.r
        - 2*layout.border.thickness - layout.left.width - layout.right.width
    layout.content.supi.width = layout.content.width * layout.supi / layout.scale

    // Scale content width to the portrait's available content width
    layout.content.scale = layout.content.supi.width / contentSupiWidth

    // Adjust the sheet height accordingly to accommodate the content height
    layout.content.supi.height = contentSupiHeight * layout.content.scale
    layout.content.height = layout.scale * layout.content.supi.height / layout.supi
    return layout
}

