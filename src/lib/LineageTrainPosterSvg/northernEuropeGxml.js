import NoE from '$lib/images/country/NorthEurope_NatGeo.png'

export function northernEuropeGxml(x, y, width=1000) {
    const els = []
    // Preset parameters
    const imgWd = 1000
    const imgHt = 790
    const image = {el: 'image', width: imgWd, href: NoE, preserveAspectRation: 'xMidYMid'}

    // Border
    const border = {el: 'rect', x: 0, y: 0, width: imgWd, height: imgHt,
        fill: 'none', stroke: 'red'}

    // Markers
    const oslo = {el: 'circle', cx: 845, cy: 260, r: 30,
        fill: 'none', stroke: 'red', 'stroke-width': 5}
    
    // scale to requested width
    const scale = width / imgWd
    const g = {el: 'g', transform: `scale(${scale})`, 
        els: [image, border, oslo]}

    const height = scale * imgHt
    return [{el: 'svg', x: x, y: y, width: width, height: height,
        els: [g]}]
}