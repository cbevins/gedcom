<script>
	import { page } from '$app/stores'
    const Menus = [
        ['/about', 'About', [
            ['/', 'Home'],
            ['/about/methodology', 'Methodology'],
            ['/about/motivation', 'Motivation'],
            ['/about/notation', 'Notation'],
            ['/about/tools', 'Tools'],
        ]],
        ['/people', 'People', [
            ['/people/explorer', 'Explorer'],
            ['/people/interest', 'Interesting Notes'],
            ['/people/immigrants', 'Immigrants'],
            ['/people/surnames', 'Surnames'],
        ]],
        ['/diagrams', 'Diagrams', [
            ['/diagrams/lineagetrain', 'Lineage Train Routes - Master'],
            ['/diagrams/lineagechart', 'Lineage Chart - Dev'],
        ]],
        ['/diagrams', 'Experimental', [
            ['/diagrams/genchartl2r', 'Generation Chart (L2R)'],
            ['/diagrams/yearchartl2r', 'Birth Year Chart(L2R)'],
            ['/diagrams/originsdisc', 'Ancestral Origins Disc'],
            ['/diagrams/yeardisc', 'Birth Year Disc'],
            ['/diagrams/gendisc', 'Generation Disc'],
        ]],
        ['/dev', 'Dev &amp; Examples', [
            ['/dev/diagnostics', 'Gedcom Summary'],
            ['/diagrams/postersvg', 'PosterSvg Example'],
            ['/diagrams/scale', 'Nested SVG *Landscape* Example'],
            // ['/sverdle', 'Sverdle'],
        ]],
    ]

    function menuHtml(props) {
        const [route, label, items] = props
        let html = menuButtonHtml(route, label)
            + '<ul class="dropdown-menu text-black bg-success">'
        for(let i=0; i<items.length; i++)
            html += menuItemHtml(...items[i])
        return html + '</ul>'
    }

    function menuButtonHtml(route, label) {
        return '<a class="nav-link dropdown-toggle text-black bg-success"'
            + `data-bs-toggle="dropdown" href="${route}">${label}</a>`
    }

    function menuItemHtml(href, text) {
        return '<a class="dropdown-item text-black bg-success" '
            + `aria-current=${$page.url.pathname === href ? 'page' : undefined}`
            + ` href="${href}">${text}</a>`
    }
</script>

<div>
    <ul class="nav nav-pills nav-justified justify-content-center">
        {#each Menus as menu}
            <li class="nav-item dropdown">
                {@html menuHtml(menu)}
            </li>
        {/each}
    </ul>
</div>

<style>
    /* inserts padding between pills */
    .nav-pills>li+li {
        margin-left: 10px;
    }
</style>