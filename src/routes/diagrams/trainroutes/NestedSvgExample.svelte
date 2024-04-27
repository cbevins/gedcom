<script>
    export let x
    export let y
</script>

<svg x="{x}" y="{y}" width="750" height="500" style="background: gray">
    <svg x="200" y="200">
        <circle cx="50" cy="50" r="50" style="fill: red" />
        <text x="50" y="50">1</text>
        <rect x="0" y="0" width="200" height="200" fill="none" stroke="red" />
    </svg>
    <circle cx="50" cy="50" r="50" style="fill: yellow" />
    <text x="50" y="50">2</text>
    <rect x="0" y="0" width="750" height="500" fill="none" stroke="yellow" />
</svg>
