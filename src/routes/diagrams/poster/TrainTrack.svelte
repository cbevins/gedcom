<script>
    export let x1       // starting x-coordinate
    export let x2       // ending x-coordinate
    export let y1       // track centerline top y-coordinate
    export let y2       // track centerline bot y-coordinate
    export let trackWidth
    export let color
    export let scale

    $: dashes = `${0.3 * trackWidth / scale} ${0.3 * trackWidth / scale}`
    $: offset = 0.2 * trackWidth

    // Return <path d=> data path from subject to child
    function pathData(off) {
        return `M ${x1+off} ${y1+off} L ${x2+off} ${y1+off} L ${x2+off} ${y2+off}`
    }
</script>

<path d={pathData(0)}
    fill="none"
    stroke={color}
    stroke-linejoin="round"
    stroke-dasharray={dashes}
    stroke-width={trackWidth} />

<path d={pathData(offset)}
    fill="none"
    stroke={color}
    stroke-linejoin="round"
    stroke-width="1" />

<path d={pathData(-offset)}
    fill="none"
    stroke={color}
    stroke-linejoin="round"
    stroke-width="1" />
