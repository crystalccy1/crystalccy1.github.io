# 3D-CovDiffusion Project Page

Static website assets for the 3D-CovDiffusion project page:

- Project page: <https://crystalccy1.github.io/3D-CovDiffusion/>
- arXiv: <https://arxiv.org/abs/2510.03011>
- Code: <https://github.com/crystalccy1/3D-CovDiffusion>

## Updating project links and metadata

The deployed page is stored as generated HTML. This maintenance step requires
Node.js 18 or newer. After replacing that HTML, run:

```bash
node scripts/update-3d-covdiffusion-seo.mjs
```

The script updates both `3D-CovDiffusion/index.html` and its matching
`3D-CovDiffusion/404.html`. It compiles one set of paper facts into visible
research answers, Highwire citation tags, Schema.org JSON-LD, crawler rules,
and the sitemap, then verifies links, author order, release-scope wording,
video controls, and the Google Scholar PDF size limit.

CI uses the non-writing validation mode:

```bash
node scripts/update-3d-covdiffusion-seo.mjs --check
```

These changes make the paper easier to understand and associate with its code,
model, and dataset; no metadata can guarantee placement in a search or AI
answer.
