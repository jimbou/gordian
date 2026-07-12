# Gordian Research Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify a minimal, editorial website for the accepted Gordian paper, deployable through GitHub Pages.

**Architecture:** A dependency-free static site in `website/` separates semantic document structure, visual styling, and progressive enhancement. A small Node test reads the generated files as delivery artifacts and validates required source-of-truth links, accessibility hooks, and Pages workflow configuration.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, inline SVG, Node.js built-in test runner, GitHub Actions.

---

## File structure

- `website/index.html` — semantic one-page research website and inline pipeline SVG.
- `website/styles.css` — responsive editorial design, light/dark variables, component styles, and reduced-motion support.
- `website/script.js` — progressive enhancements for the progress bar, reveals, citation copying, and artifact dialog.
- `website/README.md` — local preview, content-source, and deployment notes.
- `tests/website.test.mjs` — static contract tests for page content, behaviour hooks, and workflow configuration.
- `package.json` — `npm test` command using Node's built-in test runner.
- `.github/workflows/pages.yml` — GitHub Pages build-and-deploy workflow for `website/`.

### Task 1: Define the public-site contract

**Files:**
- Create: `package.json`
- Create: `tests/website.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('publishes the accepted paper, citation path, people, and accessible artifact dialog', async () => {
  const html = await read('website/index.html');
  assert.match(html, /https:\/\/arxiv\.org\/abs\/2603\.19239/);
  assert.match(html, /<dialog id="artifact-dialog"/);
  assert.match(html, /Dimitrios Stamatios Bouras/);
  assert.match(html, /Sergey Mechtaev/);
  assert.match(html, /https:\/\/scholar\.google\.com\/citations\?user=SAT5NjIAAAAJ&amp;hl=en/);
});

test('keeps the static site accessible and progressively enhanced', async () => {
  const [html, css, script] = await Promise.all([
    read('website/index.html'), read('website/styles.css'), read('website/script.js'),
  ]);
  assert.match(html, /class="skip-link"/);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /role="img"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(script, /artifact-dialog/);
});

test('deploys only the website directory with the GitHub Pages Actions workflow', async () => {
  const workflow = await read('.github/workflows/pages.yml');
  assert.match(workflow, /path: website/);
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /"website\/\*\*"/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`

Expected: fail because `package.json` and the website files do not exist.

- [ ] **Step 3: Add the smallest test command**

```json
{
  "name": "gordian-paper-site",
  "private": true,
  "scripts": { "test": "node --test tests/website.test.mjs" }
}
```

- [ ] **Step 4: Run the test again**

Run: `npm test`

Expected: fail because the page and workflow are absent.

### Task 2: Build the paper page

**Files:**
- Create: `website/index.html`
- Create: `website/styles.css`
- Create: `website/script.js`

- [ ] **Step 1: Add semantic page content**

Create a no-framework document with a skip link, header navigation, `main#main-content`, hero, abstract, original accessible SVG pipeline, three strategy articles, evidence section, copyable BibTeX, author/contact section, and native artifact dialog. Use `gordian.tex` for all technical claims. Use `https://arxiv.org/abs/2603.19239` for the paper link and the user-provided Scholar URL for Dimitrios Bouras.

- [ ] **Step 2: Add focused editorial styling**

Implement responsive CSS variables for light/dark palettes; Newsreader, Inter, and JetBrains Mono with system fallbacks; a high-contrast focus style; reduced-motion override; grid-to-single-column breakpoints; and component styles for the pipeline, strategy cards, evidence table, citation block, dialog, and people list.

- [ ] **Step 3: Add progressive behaviour**

Implement the following real DOM contracts:

```js
document.getElementById('artifact-trigger').addEventListener('click', () => {
  document.getElementById('artifact-dialog').showModal();
});

document.getElementById('copy-cite').addEventListener('click', async () => {
  await navigator.clipboard.writeText(document.getElementById('bibtex').innerText);
});
```

Include fallbacks when `HTMLDialogElement` or secure clipboard access is unavailable, and keep every substantive page section present when JavaScript is disabled.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`

Expected: all three named subtests pass.

### Task 3: Document and deploy the site

**Files:**
- Create: `website/README.md`
- Create: `.github/workflows/pages.yml`

- [ ] **Step 1: Add local-use documentation**

Document `python3 -m http.server 8080 --directory website`, identify `gordian.tex` as source of truth, name the arXiv URL, and state that artifacts are intentionally shown as coming soon until a public URL exists.

- [ ] **Step 2: Add the GitHub Pages workflow**

Use this configuration:

```yaml
name: Deploy website to GitHub Pages
on:
  push:
    branches: [main]
    paths:
      - "website/**"
      - ".github/workflows/pages.yml"
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
        with:
          enablement: true
      - uses: actions/upload-pages-artifact@v3
        with:
          path: website
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Run the complete verification suite**

Run: `npm test && git diff --check && git status --short`

Expected: all tests pass, `git diff --check` produces no whitespace errors, and only the planned site, test, documentation, workflow, and `.gitignore` files are newly added or modified (alongside the pre-existing manuscript files).
