<script>
    export let label // 'Birth', 'Death', 'Union', etc
    export let notes // a string with '\n' embedded text
    function title() {
        return (notes.length===1) ? `${notes.length} ${label} Note`
            : `${notes.length} ${label} Notes`
    }
</script>

{#if notes.length}
    <span class="badge bg-warning">{title()}</span>
{/if}
