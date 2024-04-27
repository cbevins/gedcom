<script>
    // This component must be included right after the top-level <svg> tag,
    // as its used by manu Svelte subcomponents
    import CAN from '$lib/images/svg/CAN.svelte'
    import ENG from '$lib/images/svg/ENG.svelte'
    import FRA from '$lib/images/svg/FRA.svelte'
    import GER from '$lib/images/svg/GER.svelte'
    import IRE from '$lib/images/svg/IRE.svelte'
    import NET from '$lib/images/svg/NET.svelte'
    import NOR from '$lib/images/svg/NOR.svelte'
    import SCO from '$lib/images/svg/SCO.svelte'
    import SWE from '$lib/images/svg/SWE.svelte'
    import UNK from '$lib/images/svg/UNK.svelte'
    import USA from '$lib/images/svg/USA.svelte'
    import WAL from '$lib/images/svg/WAL.svelte'
    import WAL2 from '$lib/images/svg/WAL2.svelte'

    export let radius = 20
    const diam = 2 * radius
</script>

<defs>
    <!-- Clips rectangular flags into round buttons -->
    <clipPath id="flag-clipper"><circle cx={radius} cy={radius} r={radius} /></clipPath>
    <!-- FLAGS -->
    <g id="CAN"><CAN d={diam} /></g>
    <g id="ENG"><ENG d={diam} /></g>
    <g id="FRA"><FRA d={diam} /></g>
    <g id="GER"><GER d={diam} /></g>
    <g id="IRE"><IRE d={diam} /></g>
    <g id="NET"><NET d={diam} /></g>
    <g id="NOR"><NOR d={diam} /></g>
    <g id="SCO"><SCO d={diam} /></g>
    <g id="SWE"><SWE d={diam} /></g>
    <g id="UNK"><UNK d={diam} /></g>
    <g id="USA"><USA d={diam} /></g>
    <g id="WAL"><WAL d={diam} /></g>
    <g id="WAL2"><WAL2 d={diam} /></g>
</defs>

<filter id = "flag-lighting">
    <feGaussianBlur in = "SourceAlpha" stdDeviation = "4" result = "blur1"/>
    <feSpecularLighting result = "specOut" in = "blur1" specularExponent = "100" lighting-color = "#aaaaaa">
        <fePointLight x = "15" y = "10" z = "20"/>
    </feSpecularLighting>
    <feComposite in = "SourceGraphic" in2 = "specOut" operator = "arithmetic" k1 = "0" k2 = "1" k3 = "1" k4 = "0"/>
</filter>
