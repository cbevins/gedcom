<script>
    export let source = 'Provide the source'
    export let text = 'Provide the text'
</script>

<div>
    <p class='quote'>{text}</p>
    <p class='source'>&#8212 {source}</p>
</div>

<style>
div {
	border: 2px solid black;
	border-radius: 5px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	color: black;
    margin-top: 0px;
    margin-bottom: 1rem;
    margin-left: 20px;
    margin-right: 20px;
    padding: 5px;
}
p.quote {
    font-size: 80%;
    font-style: italic;
    font-weight: normal;
    margin-top: 0px;
    margin-bottom: 0.5rem;
    text-align:left;
}
p.source {
    font-size: 80%;
    font-style:normal;
    font-weight: normal;
    margin-top: 0rem;
    margin-bottom: 0rem;
    text-align: left;
    text-indent: 20px;
}
</style>
