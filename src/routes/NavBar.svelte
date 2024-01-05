<script>
	import { page } from '$app/stores'
    const about = [
        {title: 'Home', href: '/'},
        {title: 'Motivation', href: 'about/motivation'},
        {title: 'Notation', href: 'about/notation'},
        {title: 'Tools', href: 'about/tools'},
    ]
</script>

<div>
    <ul class="nav nav-pills nav-justified justify-content-center">

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-black bg-success"
                data-bs-toggle="dropdown"
                href="/about">About
            </a>
        
            <ul class="dropdown-menu text-black bg-success">
                <li><a class="dropdown-item text-black bg-success"
                    href={about[0].href}
                    aria-current={$page.url.pathname === about[0].href ? 'page' : undefined}>
                    {about[0].title}</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/about/motivation"
                    aria-current={$page.url.pathname === about[1].href ? 'page' : undefined}>
                    {about[1].title}</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/about/notation"
                    aria-current={$page.url.pathname === about[2].href ? 'page' : undefined}>
                    {about[2].title}</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/about/tools"
                    aria-current={$page.url.pathname === about[3].href ? 'page' : undefined}>
                    {about[3].title}</a></li>
            </ul>
        </li>

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-black bg-success"
                data-bs-toggle="dropdown"
                href="/people">People</a>
            <ul class="dropdown-menu text-black bg-success">
                <!-- <li><a class="dropdown-item text-black bg-success"
                    href="/people/ancestors"
                    aria-current={$page.url.pathname === '/peopke/ancestors' ? 'page' : undefined}>
                    Ancestors</a></li> -->
                <li><a class="dropdown-item text-black bg-success"
                    href="/people/explorer"
                    aria-current={$page.url.pathname === '/people/explorer' ? 'page' : undefined}>
                    Explorer</a></li>
            </ul>
        </li>

        <!-- Bevins-Heddens -->
        <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-black bg-success"
                data-bs-toggle="dropdown"
                href="/bevins-heddens">Bevins-Heddens</a>
            <ul class="dropdown-menu text-black bg-success">
                <li><a class="dropdown-item text-black bg-success"
                    href="/bevins-heddens/highlights"
                    aria-current={$page.url.pathname === '/bevins-heddens/highlights' ? 'page' : undefined}>
                    Highlights</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/bevins-heddens/surnames"
                    aria-current={$page.url.pathname === '/bevins-heddens/surnames' ? 'page' : undefined}>
                    Surnames</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/bevins-heddens/immigrants"
                    aria-current={$page.url.pathname === '/bevins-heddens/immigrants' ? 'page' : undefined}>
                    Immigrants</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/bevins-heddens/stories"
                    aria-current={$page.url.pathname === '/bevins-heddens/stories' ? 'page' : undefined}>
                    Stories</a></li>
            </ul>
        </li> -->

        <!-- Riley-Trombley -->
        <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-black bg-success"
                data-bs-toggle="dropdown"
                href="/riley-trombley">Riley-Trombley</a>
            <ul class="dropdown-menu text-black bg-success">
                <li><a class="dropdown-item text-black bg-success"
                    href="/riley-trombley/surnames"
                    aria-current={$page.url.pathname === '/riley-trombley/surnames' ? 'page' : undefined}>
                    Surnames</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/riley-trombley/immigrants"
                    aria-current={$page.url.pathname === '/riley-trombley/immigrants' ? 'page' : undefined}>
                    Immigrants</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/riley-trombley/stories"
                    aria-current={$page.url.pathname === '/riley-trombley/stories' ? 'page' : undefined}>
                    Stories</a></li>
            </ul>
        </li> -->

        <!-- Gedcom -->
        <!-- <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-black bg-success"
                data-bs-toggle="dropdown"
                href="/gedcom">GEDCOM</a>
            <ul class="dropdown-menu text-black bg-success">
                <li><a class="dropdown-item text-black bg-success"
                    href="/gedcom/filecard">File Cards</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/gedcom/ancestortree">Ancestor Tree</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/gedcom/filecardtable">File Card Table</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/gedcom/context">Command Contexts</a></li>
                <li><a class="dropdown-item text-black bg-success"
                    href="/gedcom/records">Record Counts</a></li>
            </ul>
        </li> -->

    </ul>
</div>
<style>
    .nav-pills>li+li {
        margin-left: 10px;
    } 
</style>