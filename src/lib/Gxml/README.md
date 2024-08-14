# Gxml

Gxml stands for Generic XML, and consists of a single concept and a single function.

The concept is to use Javascript and JSON to define a XML-compliant, nested data structure that is then turned into a XML/HTML/SVG command text string.

The driving use-case for Gxml is the construction of SVG HTML elements that may be both - 1. displayed within an HTM document (using Svelte's @HTML directive), and
- 2. downloaded to the local file system as an SVG image file.

Gxml leverages the functional and procedural capabilities of Javascript to produce declarative XML, thereby avoiding the clumsy code hacks required by, for example, Svelte components.

Gxml uses JSON to define an array of Gxml elements.  A Gxml 'element' is simply a JSON object with:
- a required 'el:' property that names the element tag, like 'svg', 'defs', 'g', 'rect', 'circle', etc.
- any property attributes appropriate to the tag, and
- an optional 'els': property that is itself an array containing child Gxml objects

For example, to create an SVG <text> element:
```js
const text = {el: 'text', id: 'text-1' x: 100, y: 200, 'stroke-width': 1, 'font-size': 24,
    els: [{el: 'inner', content: 'Hello, World!'}]}
```

The Gxml elements can be composed in any order, traversed to locate child object by their 'id' (or any other) attribute, and created using logical and looping structures.

## gxmlStr()

The **gxmlStr()** function (in **gxmlStr.js**) generates XML text from an array of Gxml objects:

```js
const xml = gxmlStr(gxmlArray, indent=0, eol='\n)
```
where:
    - **gxmlArray** is a reference to the toplevel gxml object,
    - **indent** is the number of spaces to indent each nesting level, and
    - **eol** is the end-of-line character added to the end of each element
        (change **eol** to '' for no line breaks)

## runNestedExampleGxml.js

**nestedExampleGxml.js** defines some nested, scaled, and rotated SVG content.

**runNestedExampleGxml.js** uses the above to write resultant XML (SVG) to stdout:

```bash
node runNestedExampleGxml.js > nestedExampleGxml.svg
```

## runPortrait.js

This script generates an SVG formatted as a poster (in portrait mode) that scales
its arbitrary content to fit a specific sheet width and variable height.

**portraitLayoutSpecs.js** defines the general layout of a poster with sheet, border,
header, footer, left, right, and content regions.

**gridContentExampleGxml.js** defines some example content (a grid with cell coordinates)to be embedded within the poster's 'content' region.

**portraitLayout.js** computes the final geometry of the poster and scales the
provided content to fit within the poster's content region.

**portraitGxml.js** uses the final layout and the example content Gxml to generate the final poster Gxml containing the nested SVG regions.

**runPortrait.js** demonstrates how to perform the above actions and generates the
final SVG in 6 statements.  The resultant file may be read by Inkscape or used
within a browser.

```bash
node runPortrait.js > portrait.svg
```
