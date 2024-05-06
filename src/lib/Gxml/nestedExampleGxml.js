/**
 * Demonstrates composition of a simple, nested and scaled SVG diagram
 * using Gxml objects.
 */
export function nestedExampleGxml() {
    // Compose the outer <svg> with its own nested <rect>, <circle>, and <text>
    const outerRect = {el: 'rect', id: 'outer-rect', x: 0, y: 0, width: 750, height: 500,
        fill: "blue", stroke: "yellow", 'stroke-width': 1, els: []}

    const outerCircle = {el: 'circle', id: 'outer-circle', cx: 50, cy: 50, r: 50, fill: "yellow", els: []}

    const outerText = {el: 'text', id: "outer-text", x: 50, y: 50, els: [
        {el: 'inner', content: 'Outer Text Element Content', els: []}
    ]}

    const outerSvg = {el: 'svg', id: "outer-svg", x: 100, y: 100, width: outerRect.width, height: outerRect.height,
        els: [outerRect, outerCircle, outerText]}

    const outerComment = {el: 'comment', content: 'Bigger SVG'}
        
    // Compose the inner (embedded) <svg> with nested <rect>, <circle>, and <text>
    const innerRect = {el: 'rect', id: 'inner-rect', x: 0, y: 0, width: 200, height: 200,
        fill: "green", stroke: "red", 'stroke-width': 1, els: []}

    const innerCircle = {el: 'circle', id: 'inner-circle', cx: 50, cy: 50, r: 50, fill: "red", els: []}

    const innerText = {el: 'text', id: 'inner-text', x: 50, y: 50, els: [
    {el: 'inner', content: 'Inner Text Element Content', els: []}
    ]}

    const innerSvg = {el: 'svg', id: 'inner-svg', x: 200, y: 200, width: innerRect.width, height: innerRect.height,
    els: [innerRect, innerCircle, innerText] }

    const innerComment = {el: 'comment', content: 'Inner SVG'}

    // Compose a <g> to hold the inner and outer SVGs and scale them together
    const g = {el: 'g', id: "group", transform: "translate(200, -50) scale(0.5) rotate(45)",
        els: [outerComment, outerSvg, innerComment, innerSvg]}

    // Master SVG
    const svg = {el: 'svg',  xmlns: "http://www.w3.org/2000/svg", width: 1000, height: 1000, els: [g]}
    return svg
}
