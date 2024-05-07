/**
 * Contains functions that return some common layout spec for use with gxml.
 * 
 * Portrait layouts have a fixed width and a variable height.
 * Their content is scaled to fit the width, and the image height is
 * set to accomodate the sacled content height.
 * 
 * Landscape layouts are rotated 90 degrees, have a fixed height,
 * and a variable width.
 * 
 * All dimensions are inches.
 */

export function layoutSpecPortrait(sheetWd=36, sheetPad=1,
        borderThickness=1, headerHt=3, footerHt=1, leftWd=1, rightWd=1) {
    return {
        sheetWd: sheetWd,
        sheetPad: {t: sheetPad, b: sheetPad, l: sheetPad, r: sheetPad},
        borderThickness: borderThickness,
        headerHt: headerHt,
        footerHt: footerHt,
        leftWd: leftWd,
        rightWd: rightWd,
        contentWd: sheetWd - 2*sheetPad - 2*borderThickness - leftWd - rightWd
    }
}

export function layoutSpecPortraitPoster() {
    return layoutSpecPortrait(36, 0.25, 0.25, 3, 0.5, 0, 0)
}
