# Gxml

Gxml stands for Generic XML, and consists of a single concept and a single function.

The concept is to use Javascript and JSON to define XMK compliant, nested data
structures that are then turned into XML/HTML/SVG command text.

This approach leverages the functional and procedural capabilities of Javascript
to produce declarative XML, thereby avoiding the clumsy code hacks required by,
for example, Svelte components.

Simply use JSON to define an array of Gxml elements.  A Gxml element is simply a JSON
object with
- a required 'el:' property that names the tag, like 'svg', 'defs', 'g', 'rect', 'circle', etc.
- any property attributes appropriate to  the tag, and
- an optional 'els': property that is an array containing child gxml objects

For example:
const text = {el: 'text', id: 'text-1' x: 100, y: 200, 'stroke-width': 1, 'font-size': 24,
    els: [{el: 'inner', content: 'Hello, World!'}]}

The Gxml elements can be composed in any order, traversed to locate child object by their
'id' (or any other) attribute, and created using logical and looping structures.

## gxmlStr()

The gxmlStr() function (in gxmlStr.js) generates XML text from an array of Gxml objects:

const xml = gxmlStr(gxmlArray, indent=0, eol='\n)
    - gxmlArray is a reference to the toplevel gxml object,
    - indent is the number of spaces to indent each nesting level,
    - eol is the end-of-line character added to th end of each element
        (change to '' for no line breaks)

## runNestedExampleGxml.js

nestedExampleGxml.js defines some nested, scaled, and rotated SVG content.

runNestedExampleGxml.js uses the above to write resultant XML (SVG) to stdout:

```
node runNestedExampleGxml.js > nestedExampleGxml.svg
```

## runPortrait.js

This script generates an SVG formatted as a poster (in portrait mode) that scales
its arbitrary content to fit a specific sheet width and variable height.

portraitLayoutSpecs.js defines the general layout of a poster with sheet, border,
header, footer, left, right, and content regions.

gridContentExampleGxml.js defines some example content (a set of grid lines and cell ids)to be embedded within the poster's 'content' region.

portraitLayout.js computes the final geometry of the poster and scales the
provided content to fit within the poster's content region.

portraitGxml.js uses the final layout and the example content Gxml to generate the final
poster Gxml containing the nested SVG regions.

runPortrait.js demonstrates how to perform the above actions and generates the
final SVG in 6 statements.  The resultant file may be read by Inkscape or used
within a browser.

```
node runPortrait.js > portrait.svg
```
