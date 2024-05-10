/**
 * Returns an array of Gxml JSON objects defining a Lineage Train Station image
 * with a national flag background, year-of-birth, and generation lable.
 * 
 * @param {*} geom JSON object returned by trainGeometry()
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

export function trainStationGxml(geom, year, chan, flagRef='#USA',
        gen='1st GGP', color='blue', scale=1, width=100, height=100) {

    const x = geom.yearX(year) - scale * geom.rowHt
    const y = geom.chanY(chan) - scale * geom.rowHt
        
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
                    {el: 'inner', content: `${year}`}
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
