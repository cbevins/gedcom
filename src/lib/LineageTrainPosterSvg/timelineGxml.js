import { US_Migrations, US_Wars } from './timelineData.js'

export function timelineGxml(geom) {
    const els = []
    const lines = 4
    const ht = geom.timelineHt
    const lineHt = ht / lines
    const timeline = [
        {tl: US_Migrations, ytop: 0, ybot: ht, ytext: ht - 0.5 * geom.fontSize},
        {tl: US_Wars, ytop: ht+geom.contentHt, ybot: geom.height-ht,
            ytext: geom.height - (lines-1) * lineHt }
    ]

    function eventInRange(event) {
        const year = event.from[0]
        return (year >= geom.yearMin && year <= geom.yearMax)
    }
    
    function fromX(event) { return geom.yearX(event.from[0]) }
    function thruX(event) { return geom.yearX(event.thru[0]) }
    
    function labelY(i, tl) {
        const offset = (1 + i % (lines-1)) * lineHt
        return (tl === 0) ? timeline[0].ytop + offset
            : timeline[1].ytop + offset + 0.8*lineHt
    }

    // Upper  background
    els.push({el: 'rect', x: 0, y: 0,
        width: geom.width, height: geom.timelineHt,
        stroke: 'red', 'stroke-width': 5, fill: 'gray'})

    // Lower timeline background
    els.push({el: 'rect', x: 0, y: geom.timelineHt + geom.contentHt,
        width: geom.width, height: geom.timelineHt,
        stroke: 'red', 'stroke-width': 5, fill: 'gray'})

    // Upper and lower year labels and lines
    for (let col=0; col<geom.cols; col++) {
        const year = (geom.yearMin + col * geom.yearsPerCol).toString()
        const x = col * geom.colWd
        for (let j=0; j<2; j++) {
            els.push({el: 'text',
                x: x,
                y: timeline[j].ytext,
                'text-anchor': "middle",
                'font-family': "sans-serif",
                'font-weight': "lighter",
                'font-size': lineHt,
                els: [{el: 'inner',content: year}]
        })
    }
    els.push({el: 'line',
            x1: x, y1: timeline[0].ybot,
            x2: x, y2: timeline[1].ytop,
            stroke: "gray",
            'stroke-width': 5,
            'stroke-opacity': 0.5})
    }

    // Event labels
    for (let i=0; i<2; i++) {
        const tl = timeline[i].tl
        for (let j=0; j<tl.length; j++) {
            const event = tl[j]
            if(eventInRange(event)) {
                els.push({el: 'line',
                    x1: fromX(event),
                    y1: i ? timeline[1].ytop : timeline[0].ybot,
                    x2: fromX(event),
                    y2: labelY(j, i),
                    'line-cap': "round",
                    stroke: "red",
                    fill: "none",
                    'stroke-opacity': 0.6,
                    'stroke-width': 0.2 * geom.fontSize})

                els.push({el: 'text',
                    x: fromX(event),
                    y: labelY(j, i),
                    'text-anchor': "left",
                    'font-family': "sans-serif",
                    'font-weight': "lighter",
                    'font-size': 1.5 * geom.fontSize,
                    els: [{el: 'inner', content: event.label}]
                })
            }
        }
    }
    return els
}
