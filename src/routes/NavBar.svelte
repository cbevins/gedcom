<script>
	import { page } from '$app/stores'
    const Menus = [
        ['/about', 'About', [
            ['/', 'Home'],
            ['/about/motivation', 'Motivation'],
            ['/about/notation', 'Notation'],
            ['/about/tools', 'Tools'],
        ]],
        ['/people', 'People', [
            ['/people/explorer', 'Explorer'],
            ['/people/immigrants', 'Immigrants'],
            ['/people/surnames', 'Surnames'],
        ]]
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