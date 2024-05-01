<script>
    export let border
    $: bt = border.thickness / 2
</script>

<path d="M 0 0 L {border.wd} 0 L {border.wd} {border.ht} L 0 {border.ht} L 0 0"
    fill="none" stroke="black"
    stroke-dasharray="50 25"
    stroke-width={border.thickness}
    stroke-linejoin="miter"
/>

<path d="M 0 0 L {border.wd} 0 L {border.wd} {border.ht} L 0 {border.ht} L 0 0"
    fill="none" stroke="black"
    stroke-width="1"
/>

<path d="M {bt} {bt} L {border.wd-bt} {bt} L {border.wd-bt} {border.ht-bt} L {bt} {border.ht-bt} L {bt} {bt}"
    fill="none" stroke="black"
    stroke-width="1"
/>
