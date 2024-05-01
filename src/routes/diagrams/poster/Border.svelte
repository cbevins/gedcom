<script>
    export let border
</script>

<path d="M 0 0 L {border.wd} 0 L {border.wd} {border.ht} L 0 {border.ht} L 0 0"
    fill="none" stroke="black"
    stroke-dasharray="50 25"
    stroke-width={border.thickness}
/>
