export function flagDefsGxml() {
    const w = 100
    const h = 100
    const flag = {el: 'rect', x: 0, y: 0, width: w, height: h,
        fill: 'white', stroke: 'black', 'stroke-width': 0}
    const rect = {el: 'rect', x: 0, y: 0, width: w, height: h, fill: "none", stroke: 'none'}

    const clip = {el: 'clipPath', id: "flag-clipper", els: [
        {el: 'circle', cx: w/2, cy: h/2, r: w/2}
    ]}

    const can ={el: 'svg', id: 'CAN', els: [
        {...flag, fill: 'white'},
        {...rect, x: 0, y: 0, width: 25, fill: 'red'},
        {...rect, x: 75, y: 0, width: 25, fill: 'red'},
    ]}

    const eng ={el: 'svg', id: 'ENG', els: [
        {...flag, fill: 'white'},
        {el: 'line', x1: w/2, y1: 0, x2: w/2, y2: h, stroke: 'red', 'stroke-width': 20},
        {el: 'line', x1: 0, y1: h/2, x2: w, y2: h/2, stroke: 'red', 'stroke-width': 20},
    ]}

    const fra ={el: 'svg', id: 'FRA', els: [
        {...flag, fill: 'white'},
        {...rect, x: 0, y: 0, width: w/3, height: h, fill: "#0055a4"},
        {...rect, x: 2*w/3, y: 0, width: w/3, height: h, fill: "#ef4135"},
    ]}

    const ger ={el: 'svg', id: 'GER', els: [
        {...flag, fill: 'red'},
        {...rect, x: 0, y: 0, width: w, height: h/3, fill: "black"},
        {...rect, x: 0, y: 2*h/3, width: w, height: h/3, fill: "#ffcc00"},
    ]}

    const ire ={el: 'svg', id: 'IRE', els: [
        {...flag, fill: 'white'},
        {...rect, x: 0, y: 0, width: w/3, height: h, fill: "#009a49"},
        {...rect, x: 2*w/3, y: 0, width: w/3, height: h, fill: "#ff7900"},
    ]}

    const net ={el: 'svg', id: 'NET', els: [
        {...flag, fill: 'white'},
        {...rect, x: 0, y: 0, width: w, height: h/3, fill: "#009a49"},
        {...rect, x: 0, y: 2*h/3, width: w, height: h/3, fill: "#ff7900"},
    ]}

    const nor ={el: 'svg', id: 'NOR', els: [
        {...flag, fill: '#ba0c2f'},
        {el: 'line', x1: w/2, y1: 0, x2: w/2, y2: h, stroke: 'white', 'stroke-width': 400/22},
        {el: 'line', x1: 0, y1: h/2, x2: w, y2: h/2, stroke: 'white', 'stroke-width': 400/22},
        {el: 'line', x1: w/2, y1: 0, x2: w/2, y2: h, stroke: '#00205b', 'stroke-width': 200/22},
        {el: 'line', x1: 0, y1: h/2, x2: w, y2: h/2, stroke: '#00205b', 'stroke-width': 200/22},
    ]}

    const sco ={el: 'svg', id: 'SCO', els: [
        {...flag, fill: "#005eb8"},
        {el: 'line', x1: 0, y1: 0, x2: w, y2: h, stroke: 'white', 'stroke-width': 20},
        {el: 'line', x1: 0, y1: h, x2: w, y2: 0, stroke: 'white', 'stroke-width': 20},
    ]}

    const swe ={el: 'svg', id: 'SWE', els: [
        {...flag, fill: "#006aa7"},
        {el: 'line', x1: w/2, y1: 0, x2: w/2, y2: h, stroke: '#ffcd00', 'stroke-width': 20},
        {el: 'line', x1: 0, y1: h/2, x2: w, y2: h/2, stroke: '#ffcd00', 'stroke-width': 20},
    ]}

    const unk ={el: 'svg', id: 'UNK', els: [
        {...flag, fill: "gray"},
    ]}

    const wal ={el: 'svg', id: 'WAL', els: [
        {...flag, fill: 'green'},
        {...rect, x: 0, y: 0, width: w, height: h/2, fill: "white"},
    ]}

    const usaStar ={el: 'svg', id: 'USA-star', width: 100, height: 100 ,els: [
        {el: 'path', fill: 'white', stroke: 'none',
            d:"M 16 0 L 20 12 L 32 12 L 22 19.5 L 26 31.5 L 16 24 L 6 31.5 L 9.75 19.25 L 0 12 L 12.25 12 L 16 0"
        }]
    }

    const s = 0.2
    const els = []
    for (let col=0; col<6; col++) {
        for(let row=0; row<5; row++) {
            els.push({el: 'use', href: '#USA-star', transform: `scale(${s}, ${s})`,
                x:  col * (6/14) * w,
                y:  row * 0.5 * h,
            })
        }
    }
    for (let col=0; col<5; col++) {
        for(let row=0; row<4; row++) {
            els.push({el: 'use', href: '#USA-star', transform: `scale(${s}, ${s})`,
                x:  col * (6/14) * w + 0.25 * w,
                y:  row * 0.5 * h + 0.25 * h,
            })
        }
    }
    const usa ={el: 'svg', id: 'USA', els: [
        {...flag, fill: 'red'},
        {...rect, x: 0, y: h/13, width: w, height: h/13, fill: "white"},
        {...rect, x: 0, y: 3*h/13, width: w, height: h/13, fill: "white"},
        {...rect, x: 0, y: 5*h/13, width: w, height: h/13, fill: "white"},
        {...rect, x: 0, y: 7*h/13, width: w, height: h/13, fill: "white"},
        {...rect, x: 0, y: 9*h/13, width: w, height: h/13, fill: "white"},
        {...rect, x: 0, y: 11*h/13, width: w, height: h/13, fill: "white"},
        {...rect, x: 0, y: 0, width: w/2, height: h*6/13, fill: "blue"},
        // {el: 'use', href: '#USA-star', x: w, y: h, transform: `scale(${s}, ${s})`},
        // {el: 'use', href: '#USA-star', x: 2.25*w, y: 1.75*h, transform: `scale(${s}, ${s})`},
        // {el: 'use', href: '#USA-star', x: 1.75*w, y: 1.75*h, transform: `scale(${s}, ${s})`},
        // {el: 'use', href: '#USA-star', x: 1.25*w, y: 1.75*h, transform: `scale(${s}, ${s})`},
        // {el: 'use', href: '#USA-star', x: 0.75*w, y: 1.75*h, transform: `scale(${s}, ${s})`},
        // {el: 'use', href: '#USA-star', x: 0.25*w, y: 1.75*h, transform: `scale(${s}, ${s})`},
        [...els]
    ]}

    const defs = {el: 'defs', els: [
        clip, usaStar, can, eng, fra, ger, ire, net, nor, sco, swe, unk, usa, wal
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
