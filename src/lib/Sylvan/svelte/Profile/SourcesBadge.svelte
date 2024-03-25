<script>
    export let label // 'Birth', 'Death', 'Union', etc
    export let sources // an arrray of {source} '@S123@' keys
    function title() {
        return (sources.length===1) ? `${sources.length} ${label} Source`
            : `${sources.length} ${label} Sources`
    }
</script>

{#if sources.length}
    <span class="badge bg-info">{title()}</span>
{/if}
