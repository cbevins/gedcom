<script>
    // All units are hundreths of an inch
    // Poster is 36" wide with variable height
    import BorderTracks from './BorderTracks.svelte'
    import Footer from './Footer.svelte'
    import GuideBox from './GuideBox.svelte'
    import GuideLines from './GuideLines.svelte'
    import Content from './Content.svelte'
    import Header from './Header.svelte'

    // Must import any SVG <defs>
	import FlagSvgDefs from './FlagSvgDefs.svelte';

    export let layout

    $: sheet = layout.sheet
    $: border = layout.border
    $: header = layout.header
    $: footer = layout.footer
    $: left = layout.left
    $: right = layout.right
    $: content = layout.content
    $: guides = layout.guides
</script>

<svg id="sheet" xmlns="http://www.w3.org/2000/svg"
        width={sheet.wd} height={sheet.ht}
        transform="translate({sheet.x}, {sheet.y}) scale({sheet.scale}) rotate({sheet.rotate})">

    <defs>
        <!-- Clips rectangular flags into round buttons -->
        <clipPath id="flag-clipper"><circle cx="50" cy="50" r="50" /></clipPath>
        <FlagSvgDefs />
    </defs>
    
    <filter id = "flag-lighting">
        <feGaussianBlur in = "SourceAlpha" stdDeviation = "4" result = "blur1"/>
        <feSpecularLighting result = "specOut" in = "blur1" specularExponent = "100" lighting-color = "#aaaaaa">
            <fePointLight x = "40" y = "40" z = "40"/>
        </feSpecularLighting>
        <feComposite in = "SourceGraphic" in2 = "specOut" operator = "arithmetic" k1 = "0" k2 = "1" k3 = "1" k4 = "0"/>
    </filter>
    
    <GuideBox {guides} geom={sheet} />

    <!-- 'border' nested inside 'sheet'-->
    <svg id="border" x={border.x} y={border.y} width={border.wd} height={border.ht}>
        <BorderTracks {border} />
        <GuideBox {guides} geom={border} />

        <!-- 'header' nested inside 'border'-->
        <svg id="header" x={header.x} y={header.y} width={header.wd} height={header.ht}>
            <Header {layout} />
            <GuideBox {guides} geom={header} />
        </svg>

        <!-- 'footer' nested inside 'border'-->
        <svg id="footer" x={footer.x} y={footer.y} width={footer.wd} height={footer.ht}>
            <Footer {footer} />
            <GuideBox {guides} geom={footer} />
        </svg>

        <!-- 'left' nested inside 'border'-->
        <svg id="left" x={left.x} y={left.y} width={left.wd} height={left.ht}>
            <GuideBox {guides} geom={left} />
        </svg>

        <!-- 'right' nested inside 'border'-->
        <svg id="right" x={right.x} y={right.y} width={right.wd} height={right.ht}>
            <GuideBox {guides} geom={right} />
        </svg>

        <!-- 'content' nested inside 'border'-->
        <svg id="content" x={content.x} y={content.y} width={content.wd} height={content.ht}>
            <Content {content} />
            <GuideBox {guides} geom={content} />
        </svg>
        
    </svg>
    <GuideLines {guides} {sheet} />
</svg>
