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

export function layoutSpecPoster(sheetWd=36, sheetPad=1,
        borderThickness=1, headerHt=3, footerHt=1, leftWd=1, rightWd=1,
        coverHt=0) {
    return {
        sheetWd: sheetWd,
        sheetPad: {t: sheetPad, b: sheetPad, l: sheetPad, r: sheetPad},
        borderThickness: borderThickness,
        headerHt: headerHt,
        footerHt: footerHt,
        leftWd: leftWd,
        rightWd: rightWd,
        coverHt: coverHt,
        contentWd: sheetWd - 2*sheetPad - 2*borderThickness - leftWd - rightWd
    }
}

export function layoutSpecPortraitPoster() {
    return layoutSpecPoster(
        36,     // sheetWd
        0.25,   // sheetPad
        0.25,   // borderThickness
        3,      // headerHt
        0.5,    // footerHt
        0,      // leftWd,
        0,      // rightWd
        0       // coverWd
    )
}
