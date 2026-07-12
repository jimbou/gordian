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
  assert.match(html, /28\.5–115\.2%/);
  assert.match(html, /91–96%/);
});

test('credits both authors and explains ghost code with a concrete example', async () => {
  const html = await read('website/index.html');

  assert.match(html, /https:\/\/mechtaev\.com/);
  assert.match(html, /https:\/\/scholar\.google\.com\/citations\?user=XTFR93cAAAAJ&amp;hl=en/);
  assert.match(html, /bouras\.online/);
  assert.match(html, /src="assets\/gordian-mark\.svg"/);
  assert.match(html, /Flight-ID gate/);
  assert.match(html, /ghost model/);
  assert.match(html, /Ghost modeling/);
  assert.match(html, /Bidirectional propagation/);
  assert.match(html, /Semantic heap shapes/);
  assert.match(html, /sin\(x\) and cos\(x\)/);
  assert.match(html, /Inverse ghost/);
  assert.match(html, /Ring-shaped skiplist/);
  assert.match(html, /values remain symbolic/);
  assert.equal((html.match(/class="example-figure/g) ?? []).length, 3);
  assert.equal((html.match(/class="example-explanation"/g) ?? []).length, 3);
  assert.match(html, /Three worked examples/);
});

test('keeps the static site accessible and progressively enhanced', async () => {
  const [html, css, script] = await Promise.all([
    read('website/index.html'),
    read('website/styles.css'),
    read('website/script.js'),
  ]);

  assert.match(html, /class="skip-link"/);
  assert.match(html, /<main id="main-content">/);
  assert.match(html, /role="img"/);
  assert.match(html, /id="copy-cite"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(script, /artifact-dialog/);
  assert.match(script, /copy-cite/);
});

test('deploys only the website directory with the GitHub Pages Actions workflow', async () => {
  const workflow = await read('.github/workflows/pages.yml');

  assert.match(workflow, /path: website/);
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /"website\/\*\*"/);
});
