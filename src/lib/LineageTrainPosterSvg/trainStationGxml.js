/**
 * Returns an array of Gxml JSON objects defining a Lineage Train Station image
 * with a national flag background, year-of-birth, and generation lable.
 * 
 * @param {integer} year Year of birth
 * @param {integer} chan Channel index
 * @param {*} flagRef Something like '#NOR' or '#USA'
 * @param {string} gen Generation label, something like '13th GGP'
 * @param {string} color COlor specification for enclosing circle
 * @param {*} scale scale
 * @param {*} width Not used
 * @param {*} height Not used
 * @returns A single Gxml JSON object with nested Gxml.
 */
import { flagGxml } from '../PosterSvg/flagGxml.js'

export function trainStationGxml(x, y, flagRef='#USA', year,
    gen='1st GGP', color='blue', scale=1, width=100, height=100) {
    const fontSize = scale * 28

    const flagDiam = 100    // do not change --- this is from the flag <defs>!!!
    const flagRadius = flagDiam / 2
    const flagScale = 0.9
    const flagPos = (1-flagScale) * flagRadius
    const flagDisc = flagGxml(flagRef, flagPos, flagPos, flagScale,
        flagDiam/flagScale, flagDiam/flagScale)

    const fontColor = (flagRef==='#GER') ? 'white' : 'black'
    const yearText = {el: 'text',
        'text-anchor': 'middle',
        'font-size': fontSize,
        'font-weight': 'bold',
        stroke: fontColor,
        fill: fontColor,
        els: [
            {el: 'textPath', href: '#text-path-upper', startOffset: '50%', els: [ 
                {el: 'inner', content: `${year}`}
            ]},
        ]
    }

    const genText = {el: 'text',
        'text-anchor': 'middle',
        'font-size': fontSize,
        'font-weight': 'bold',
            els: [
                {el: 'textPath', href: '#text-path-lower', startOffset: '50%', els: [ 
                    {el: 'inner', content: gen}
                ]},
        ]}

    const ring = {el: 'circle',
        cx: flagRadius,
        cy: flagRadius,
        r: 0.9 * flagRadius,
        fill: 'none',
        stroke: color,
        'stroke-width': scale * 8
    }

    return {el: 'svg',
        x: x,
        y: y,
        width: scale*width,
        height: scale*height,
        els: [
            {el: 'g', transform: `scale(${scale}, ${scale})`, els: [
                flagDisc, yearText, genText, ring]}
        ]
    }
}
