# Gordian research website design

## Purpose

Create a single-page, citation-focused public website for the accepted ISSTA 2026 paper *Defusing Logic Bombs in Symbolic Execution with LLM-Generated Ghost Code*. The site explains the contribution to an unfamiliar research reader, links to the public arXiv record, and gives authorship and citation details without presenting the work as a product.

## Source of truth

`gordian.tex` is authoritative for title, abstract, authors, affiliation, three ghost-code variants, benchmark scope, and evaluation claims. The public paper destination is `https://arxiv.org/abs/2603.19239`. The page must not adopt conflicting arXiv evaluation numbers as page copy.

## Experience

The design is a warm editorial research page: a soft paper background, high-legibility serif display type, a restrained cobalt system colour, and a small amber signal for LLM-generated ghost code. It avoids stock images, generic AI language, excessive animation, cards used as decoration, and marketing calls to action.

The page structure is:

1. Sticky navigation and a title hero with authors, ISSTA 2026 acceptance, arXiv and artifact actions.
2. A short abstract section.
3. An original inline SVG explaining the hybrid loop: a hard program fragment receives a generated ghost-code aid, KLEE and the SMT solver retain global reasoning, and candidate inputs are validated against the original program.
4. Three concise ghost-code variants: inversion, solver-friendly surrogates, and heap-space partitioning.
5. Evidence from LogicBombs, FDLibM, and structured-input programs, using the accepted-manuscript figures.
6. A copyable BibTeX entry with an arXiv fallback and accepted-at-ISSTA note.
7. People/contact details, including author emails and Dimitrios Bouras's Google Scholar profile.

## Behaviour and accessibility

The page is fully readable without JavaScript. JavaScript progressively adds a scroll-progress bar, reduced-motion-aware reveals, the copy-citation control, and a native dialog for the unavailable artifact. Keyboard focus remains visible; semantic headings, labels, image alternatives, target blank link protections, and a skip link are required. The layout is responsive and supports light and dark system themes.

## Delivery

All deployable assets live under `website/`. `.superpowers/` is ignored. `.github/workflows/pages.yml` deploys `website/` through the GitHub Pages Actions source after pushes to `main` that touch website files or the workflow. A Node built-in-test smoke suite checks the critical page contract and workflow settings.
