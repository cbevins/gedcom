export function flagDefsGxml() {
    const w = 100
    const h = 100
    const flag = {el: 'rect', x: 0, y: 0, width: w, height: h,
        fill: 'white', stroke: 'black', 'stroke-width': 0}
    const rect = {el: 'rect', x: 0, y: 0, width: w, height: h, fill: "none"}

    const clip = {el: 'clipPath', id: "flag-clipper", els: [
        {el: 'circle', cx: w/2, cy: h/2, r: w/2}
    ]}

    const can ={el: 'g', id: 'CAN', els: [
        {...flag, fill: 'white'},
        {...rect, x: 0, y: 0, width: 25, fill: 'red'},
        {...rect, x: 75, y: 0, width: 25, fill: 'red'},
    ]}

    const eng ={el: 'g', id: 'ENG', els: [
        {...flag, fill: 'white'},
        {el: 'line', x1: w/2, y1: 0, x2: w/2, y2: h, stroke: 'red', 'stroke-width': 20},
        {el: 'line', x1: 0, y1: h/2, x2: w, y2: h/2, stroke: 'red', 'stroke-width': 20},
    ]}

    const fra ={el: 'g', id: 'FRA', els: [
        {...flag, fill: 'white'},
        {...rect, x: 0, y: 0, width: w/3, height: h, fill: "#0055a4"},
        {...rect, x: 2*w/3, y: 0, width: w/3, height: h, fill: "#ef4135"},
    ]}

    const ger ={el: 'g', id: 'GER', els: [
        {...flag, fill: 'red'},
        {...rect, x: 0, y: 0, width: w, height: h/3, fill: "black"},
        {...rect, x: 0, y: 2*h/3, width: w, height: h/3, fill: "#ffcc00"},
    ]}

    const ire ={el: 'g', id: 'IRE', els: [
        {...flag, fill: 'white'},
        {...rect, x: 0, y: 0, width: w/3, height: h, fill: "#009a49"},
        {...rect, x: 2*w/3, y: 0, width: w/3, height: h, fill: "#ff7900"},
    ]}

    const net ={el: 'g', id: 'NET', els: [
        {...flag, fill: 'white'},
        {...rect, x: 0, y: 0, width: w, height: h/3, fill: "#009a49"},
        {...rect, x: 0, y: 2*h/3, width: w, height: h/3, fill: "#ff7900"},
    ]}

    const nor ={el: 'g', id: 'NOR', els: [
        {...flag, fill: '#ba0c2f'},
        {el: 'line', x1: w/2, y1: 0, x2: w/2, y2: h, stroke: 'white', 'stroke-width': 400/22},
        {el: 'line', x1: 0, y1: h/2, x2: w, y2: h/2, stroke: 'white', 'stroke-width': 400/22},
        {el: 'line', x1: w/2, y1: 0, x2: w/2, y2: h, stroke: '#00205b', 'stroke-width': 200/22},
        {el: 'line', x1: 0, y1: h/2, x2: w, y2: h/2, stroke: '#00205b', 'stroke-width': 200/22},
    ]}

    const sco ={el: 'g', id: 'SCO', els: [
        {...flag, fill: "#005eb8"},
        {el: 'line', x1: 0, y1: 0, x2: w, y2: h, stroke: 'white', 'stroke-width': 20},
        {el: 'line', x1: 0, y1: h, x2: w, y2: 0, stroke: 'white', 'stroke-width': 20},
    ]}

    const swe ={el: 'g', id: 'SWE', els: [
        {...flag, fill: "#006aa7"},
        {el: 'line', x1: w/2, y1: 0, x2: w/2, y2: h, stroke: '#ffcd00', 'stroke-width': 20},
        {el: 'line', x1: 0, y1: h/2, x2: w, y2: h/2, stroke: '#ffcd00', 'stroke-width': 20},
    ]}

    const unk ={el: 'g', id: 'UNK', els: [
        {...flag, fill: "gray"},
    ]}

    const wal ={el: 'g', id: 'WAL', els: [
        {...flag, fill: 'green'},
        {...rect, x: 0, y: 0, width: w, height: h/2, fill: "white"},
    ]}

    const els = [{...flag, fill: "red"}]
    // els.push({el: 'g', id: 'USAstar',  transform: "scale({16/100})", els: [
    //     {el: 'path', fill: 'white', stroke: 'none',
    //     d:"M 16 0 L 20 12 L 32 12 L 22 19.5 L 26 31.5 L 16 24 L 6 31.5 L 9.75 19.25 L 0 12 L 12.25 12 L 16 0"},
    // ]})
    for(let i=1; i<12; i+=2) {  // stripes
        els.push({el: 'rect', x: 0, y: i*h/13, w: w, h: h/13, fill: 'white', stroke: 'none'})
    }
    els.push({...rect, x: 0, y: 0, width: w/2, h: h*6/13, fill: 'blue'})  // canton
    // for (let col=0; col<6; col++) {
    //     for(let row=0; row<5; row++) {
    //         els.push({el: 'use', 'xlink:href': "#USAstar",
    //             x: (2*col+0.5)*50/12,
    //             y: (2*row+0.5)*60/13
    //         })
    //     }
    // }
    // for (let col=0; col<5; col++) {
    //     for(let row=0; row<4; row++) {
    //         els.push({el: 'use', 'xlink:href': "#USAstar",
    //             x: ((2*(col+1))-0.5)*50/12,
    //             y: ((2*(row+1))-0.5)*60/13
    //         })
    //     }
    // }
    const usa ={el: 'g', id: 'USA', els: [{...flag, fill: "red"}, ...els]}

    const defs = {el: 'defs', els: [
        clip, can, eng, fra, ger, ire, net, nor, sco, swe, unk, usa, wal
    ]}

    const filter = {el: 'filter', id: 'flag-lighting', els: [
        {el: 'feGaussianBlur', in: "SourceAlpha", stdDeviation: 4, result: "blur1"},
        {el: 'feSpecularLighting', result: "specOut", in: "blur1", specularExponent: 100,
            'lighting-color': "#aaaaaa", els: [
                {el: 'fePointLight', x: 40, y: 40, z: 40}
            ]
        },
        {el: 'feComposite', in: "SourceGraphic", in2: "specOut",
            operator: "arithmetic", k1: 0, k2: 1, k3: 1, k4: 0}
    ]}
    return [defs, filter]
}
