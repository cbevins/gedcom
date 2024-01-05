<script>
    export let label // 'Birth', 'Death', 'Union', etc
    export let notes // a string with '\n' embedded text
    // export let id // unique id suffix
    // const tag = `notes-${label}-${id}-`
    function title() {
        return (notes.length===1) ? `${notes.length} ${label} Note`
            : `${notes.length} ${label} Notes`
    }
</script>

{#if notes.length}
<!-- <div class="accordion" id={tag}>
    <div class="accordion-item">
        <h2 class="accordion-header" id={tag+"heading"}>
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target={"#"+tag+"collapse"}
                    aria-expanded="true"
                    aria-controls={tag+"collapse"}> -->
                <span class="badge bg-warning">{title()}</span>
            <!-- </button>
        </h2>
        <div id={tag+"collapse"}
            class="accordion-collapse collapse show"
            aria-labelledby={tag+"heading"}>
            <div class="accordion-body">
                {notes}
            </div>
        </div>
    </div> -->
    <!-- notes already has its lines stored as '\n' embedded text -->
    <!-- [{notes}] -->
<!-- </div> -->
{/if}
