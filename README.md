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
`3D-CovDiffusion/404.html`, then verifies the scholarly metadata, arXiv/GitHub
links, author list, and existing video controls. Root-level `robots.txt` and
`sitemap.xml` expose the canonical project URL to crawlers.
