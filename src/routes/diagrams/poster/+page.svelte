<script>
    // All units are hundreths of an inch
    // Poster is 36" wide with variable height
    import Sheet from './Sheet.svelte'
    $: guides = true        // force guides to be reactive

    const scale = 4.25
</script>

<Sheet
    upi=100
    sheetHt={48/scale}
    sheetWd={36/scale}
    sheetMargin={0.25/scale}
    borderThickness={0.25/scale}
    headerHt={3/scale}
    footerHt={1/scale}
    leftWd={0/scale}
    rightWd={0/scale}
    {guides}
/>
