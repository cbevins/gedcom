<script>
    export let person

    function notesHtml(notes) {
        let html = ''
        for (let i=0; i<notes.length; i++) {
            html += `<h3>Notes ${i+1}</h3>`
            const lines = notes[i].split('/n')
            for (let j=0; j<lines.length; j++)
                html += lines[j] + '<br />'
        }
        return html
    }
</script>

{@html notesHtml(person.notes())}