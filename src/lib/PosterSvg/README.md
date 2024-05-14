# PosterSvg

PosterSvg expands upon the Gxml package example poster.
It provides a framework for scaling and embedding arbitrary
SVG content within a poster layout.

This particular PosterSvg demonstrates how to create a portait oriented poster laid out as:
- a *sheet* that is 36 inches wide with 0.25 inch padding, containing 6 *regions*:
    - a *border* region that is a 0.25-inch wide train track or other design;
    - a *header* region that is 3 inches high with a title and subtitle;
    - a *footer* region that is 0.5-inch high with a copyright and date;
    - a *left* region that has zero width;
    - a *right* region that has zero width;
    - a *content* region that shows a grid matrix of 10 columns and 20 rows.

## runPosterSvg.js

Creates the SVG code and writes it to stdout for subsequeny use by other applications.
```
node runPosterSvg.js > poster.svg
```

## PosterSvg.svelte

A simple Svelte component that displays the poster svg.

## posterSvg.js

The main SVG generation function used by **runPosterSvg.js** and **PosterSvg.svelte**

## Gxml Files

The following files contain example Gxml code:
- `borderGxml.js` defines the border region and its content as Gxml
- `contentGxml.js` defines the example content region (a simple grid) as GMxml
- `footerGxml.js` defines the footer region and its content as Gxml
- `guidesGxml.js` defines optional border and ruler guides as Gxml
- `headerGxml.js` defines the header region and its content as Gxml
- `posterGxml.js` incorporates all the other regions into a parent Gxml

## Layout Files

The following files define alternate poster layouts and scale the embedded content:
- `portraitLayout.js`
- `portraitLayoutSpecs.js`

## Demonstration Gxml Files

The following files were devloped to illustrate other aspects:

- `Countries.js` is a JSON data structure of country names and flags
- `flagDefsGxml.js` defines an SVG <defs> block with flag images, text paths, clip paths, etc.
- `flagGxml.js` illustrates how to scale and display a single flag using Gxml
- `trainStationGxml.js` shows how to perform clipping and lighting of the flags
into buttons
- `trainTracksGxml.js` illustrates drawing train tracks using Gxml