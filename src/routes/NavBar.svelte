<script>
	import { page } from '$app/stores'
    const about = [
        ['/', 'Home'],
        ['/about/motivation', 'Motivation'],
        ['/about/notation', 'Notation'],
        ['/about/tools', 'Tools']
    ]
    const people = [
        ['/people/explorer', 'Explorer'],
        ['/people/immigrants', 'Immigrants'],
        ['/people/surnames', 'Surnames'],
    ]
    const Menus = [
        ['/about', 'About', about],
        ['/people', 'People', people]
    ]

    function menuHtml(props) {
        const [route, label, items] = props
        let html = menuButtonHtml(route, label)
        html += '<ul class="dropdown-menu text-black bg-success">'
        for(let i=0; i<items.length; i++) {
            const [href, text] = items[i]
            html += menuItemHtml(href, text)
        }
        html += '</ul>'
        return html
    }

    function menuButtonHtml(route, label) {
        let html = '<a class="nav-link dropdown-toggle text-black bg-success"'
        html += 'data-bs-toggle="dropdown"'
        html += `href="${route}">${label}</a>`
        return html
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