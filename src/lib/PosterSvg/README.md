# PosterSvg

PosterSvg expands upon the Gxml package example poster.

It demonstrates how to create a portait oriented poster as follows:
- defines a *sheet* that is 36" wide with 0.25 inch padding, containing 6 *regions*:
    - a *border* region that is a 0.25-inch wide train track
    - a *header* region that is 3 inches high with a title and subtitle
    - a *footer* region that is 0.5-inch high with a copyright and date
    - a *left* region that has zero width,
    - a *right* region that has zero width,
    - a *content* region that shows a grid matrix of 10 columns and 20 rows.

## runPosterSvg.js

Creates the SVG code and writes it to stdout.
```
node runPosterSvg.js > poster.svg
```

## PosterSvg.svelte

A simple Svelte component that displays the poster svg.

## posterSvg.js

The main SVG generation function used by **runPosterSvg.js** and **PosterSvg.svelte**

## Gxml Files

The following files contain example Gxml code:
- borderGxml.js
- contentGxml.js
- footerGxml.js
- guidesGxml.js
- headerGxml.js
- posterGxml.js

## Layout Files

- portraitLayout.js
- portraitLayoutSpecs.js