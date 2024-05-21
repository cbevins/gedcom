export function timelineGxml(geom, upperEvents, lowerEvents, scale, lines=4) {
    const els = []
    const ht = geom.timelineHt
    const lineHt = ht / lines

    const upper = {ytop: 0, ybot: ht, ytext: ht - 0.5 * geom.fontSize,
        events: upperEvents}
    const lower = {ytop: ht+geom.contentHt, ybot: geom.height-ht,
        ytext: geom.height - (lines-1) * lineHt,
        events: lowerEvents}

    function upperLinePath(event, eidx) {
        const row = (lines-1) - eidx % (lines-1)
        const x1 = fromX(event)
        const x2 = event.thru ? thruX(event) : x1
        const xmid = (x1 + x2) / 2
        const y2 = geom.timelineHt - row * lineHt
        const y1 = geom.timelineHt
        const y3 = y2 - 0.4 * lineHt
        return `M ${x1} ${y1} L ${x1} ${y2} L ${xmid} ${y2} L ${xmid} ${y3} L ${xmid} ${y2} L ${x2} ${y2} L ${x2} ${y1}`
    }

    function lowerLinePath(event, eidx) {
        const row = 1 + eidx % (lines-1)
        const x1 = fromX(event)
        const x2 = event.thru ? thruX(event) : x1
        const xmid = (x1 + x2) / 2
        // Draw from bottom up
        const y1 = geom.height - geom.timelineHt
        const y2 = y1 + row * lineHt  - 0//1 * lineHt
        const y3 = y2 + 0.4 * lineHt
        return `M ${x1} ${y1} L ${x1} ${y2} L ${xmid} ${y2} L ${xmid} ${y3} L ${xmid} ${y2} L ${x2} ${y2} L ${x2} ${y1}`
    }
    
    function eventInRange(event) {
        const year = event.from[0]
        return (year >= geom.yearMin && year <= geom.yearMax)
    }
    
    function fromX(event) { return geom.yearX(event.from[0]) }
    function thruX(event) {
        return event.thru ? geom.yearX(event.thru[0]) : geom.yearX(event.from[0])}
    
    function labelY(eidx, tidx) {
        const offset = (1 + eidx % (lines-1)) * lineHt - 0.1 * lineHt
        return (tidx===0) ? upper.ytop + offset : lower.ytop + offset + 0.9*lineHt
    }

    // Upper  background
    els.push({el: 'rect', x: 0, y: 0,
        width: geom.width, height: geom.timelineHt,
        stroke: 'black', 'stroke-width': 2, fill: 'gray'})

    // Lower timeline background
    els.push({el: 'rect', x: 0, y: geom.timelineHt + geom.contentHt,
        width: geom.width, height: geom.timelineHt,
        stroke: 'black', 'stroke-width': 2, fill: 'gray'})

    // Upper and lower year labels and lines
    for (let col=0; col<geom.cols; col++) {
        const year = (geom.yearMin + col * geom.yearsPerCol).toString()
        const x = col * geom.colWd
        for (let tidx=0; tidx<2; tidx++) {
            const tl = (tidx===0) ? upper : lower
            els.push({el: 'text',
                x: x,
                y: tl.ytext,
                'text-anchor': "middle",
                'font-family': "sans-serif",
                'font-weight': "lighter",
                'font-size': lineHt,
                els: [{el: 'inner',content: year}]
        })
    }
    els.push({el: 'line',
            x1: x, y1: upper.ybot,
            x2: x, y2: lower.ytop,
            stroke: "gray",
            'stroke-width': 5,
            'stroke-opacity': 0.5})
    }

    // Event labels
    for (let tidx=0; tidx<2; tidx++) {
        const tl = (tidx===0) ? upper : lower
        for (let eidx=0; eidx<tl.events.length; eidx++) {
            const event = tl.events[eidx]
            if(eventInRange(event)) {
                const d = (tidx===0) ? upperLinePath(event, eidx) : lowerLinePath(event, eidx)
                els.push({el: 'path', d: d,
                    stroke: "red",
                    fill: "none",
                    'stroke-opacity': 0.6,
                    'stroke-width': 0.5 * geom.fontSize,
                    'marker-end': "url(#arrowhead)"})
                els.push({el: 'text',
                    x: (fromX(event) + thruX(event))/2,
                    y: labelY(eidx, tidx),
                    'text-anchor': event.align,
                    'font-family': "sans-serif",
                    'font-weight': "lighter",
                    'font-size': 2 * geom.fontSize,
                    els: [{el: 'inner', content: event.label}]
                })
            }
        }
    }
    return els
}
