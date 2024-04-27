<script>
    export let x
    export let y
    export let country // an uppercase 3-character country abbreviation
    export let scale = 5
</script>

<use x={x} y={y} href="#{country}"
    transform="scale({scale})"
    filter="url(#flag-lighting)"
    clip-path="url(#flag-clipper)" /> 
