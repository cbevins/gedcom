/**
 * Returns an array of Gxml JSON objects defining a Lineage Train Station image
 * with a national flag background, year-of-birth, and generation lable.
 * 
 * @param {*} x upper left corner x-coordinate
 * @param {*} y upper left corner y-coordinate
 * @param {*} flagRef Something like '#NOR' or '#USA'
 * @param {*} scale scale
 * @param {string} gen Generation label, something like '13th GGP'
 * @param {string} born Year of birth AS A STRING
 * @param {string} color COlor specification for enclosing circle
 * @param {*} width Not used
 * @param {*} height Not used
 * @returns A single Gxml JSON object with nested Gxml.
 */
import { flagGxml } from './flagGxml.js'

export function trainStationGxml(x, y, flagRef='#USA',
        gen='1st GGP', born='1952', color='blue',
        scale=1, width=100, height=100) {
    const fontSize = 24
    const flagScale = 0.9
    const flagPos = (1-flagScale) * 100 / 2
    return {el: 'svg', id: 'train-station',
            x: x, y: y, width: scale*width, height: scale*height, els: [
        {el: 'g', transform: `scale(${scale}, ${scale})`, els: [
            flagGxml(flagRef, flagPos, flagPos, flagScale, 100/flagScale, 100/flagScale),
            {el: 'text',
                'text-anchor': 'middle', 'font-size': fontSize, 'font-weight': 'bold', els: [
                {el: 'textPath', href: '#text-path-upper', startOffset: '50%', els: [ 
                    {el: 'inner', content: born}
                ]},
            ]},
            {el: 'text',
                'text-anchor': 'middle', 'font-size': fontSize, 'font-weight': 'bold', els: [
                {el: 'textPath', href: '#text-path-lower', startOffset: '50%', els: [ 
                    {el: 'inner', content: gen}
                ]},
            ]},
            {el: 'circle', cx: 50, cy: 50, r: 47, fill: 'none', stroke: color, 'stroke-width': 4}
        ]}
    ]}
}
