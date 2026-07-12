# Gordian — project website

The public research page for *Defusing Logic Bombs in Symbolic Execution with LLM-Generated Ghost Code* (accepted at ISSTA 2026).

`../gordian.tex` is the source of truth for paper claims and benchmark scope. The public paper link points to [arXiv:2603.19239](https://arxiv.org/abs/2603.19239). The artifact button intentionally announces that artifacts are coming soon until a public package URL is available.

## Preview locally

```bash
python3 -m http.server 8080 --directory website
```

Open <http://localhost:8080>. Run `npm test` from the repository root to check the public-page contract and GitHub Pages workflow.

## Deployment

`.github/workflows/pages.yml` publishes `website/` after relevant commits reach `main`. In the repository’s GitHub Pages settings, select **GitHub Actions** as the build and deployment source.
