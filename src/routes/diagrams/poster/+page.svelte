<script>
    // All units are hundreths of an inch
    // Poster is 36" wide with variable height
    import Sheet from './Sheet.svelte'
</script>
 
<Sheet
    upi=100
    sheetHt=6
    sheetWd=6
    sheetMargin=0.25
    borderThickness=0.25
    headerHt = 1
    footerHt = 1
    leftWd = 1
    rightWd = 1
    guides = true
>
HELLO
<span slot="header"><rect x="10" y="10" width="100" height="20" fill="red"/></span>
</Sheet>
