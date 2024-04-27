<script>
    export let x
    export let y
</script>

<svg x="0" y="0" width="1000" height="1000" style="background: gray">
    <g  transform="translate({x},{y}) scale(1)">
    <svg x="200" y="200">
        <circle cx="50" cy="50" r="50" style="fill: red" />
        <text x="50" y="50">1</text>
        <rect x="0" y="0" width="200" height="200" fill="none" stroke="red" />
    </svg>
    <circle cx="50" cy="50" r="50" style="fill: yellow" />
    <text x="50" y="50">2</text>
    <rect x="0" y="0" width="750" height="500" fill="none" stroke="yellow" />
</g>
</svg>
