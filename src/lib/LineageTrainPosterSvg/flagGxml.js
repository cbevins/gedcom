/**
 * Returns an array of Gxml JSON objects defining a circular flag image.
 * Requires that the flagDefsGxml.js Gxml JSON objects are loaded into the poster preamble.
 * 
 * @param {} id id (href) of the predefined flag in the <defs> block
 * @param {*} x upper left corner x-coordinate
 * @param {*} y upper left corner y-coordinate
 * @param {*} scale scale
 * @param {*} width Not used
 * @param {*} height Not used
 * @returns A single Gxml JSON object with nested Gxml.
 */
export function flagGxml(id, x, y, scale=1, width=100, height=100) {
    return {el: 'svg', x: x, y: y, width: scale*width, height: scale*height, els: [
    {el: 'g', transform: `scale(${scale}, ${scale})`, els: [
        {el: 'use', x: 0, y: 0,
            href: id,
            filter: "url(#flag-lighting)",
            'clip-path':"url(#flag-clipper)"
        }]
    }]}
}
