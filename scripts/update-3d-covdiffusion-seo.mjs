import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = join(scriptDirectory, "..");
const pageFiles = [
  join(repositoryRoot, "3D-CovDiffusion", "index.html"),
  join(repositoryRoot, "3D-CovDiffusion", "404.html"),
];

const title =
  "3D-CovDiffusion: 3D-Aware Diffusion Policy for Coverage Path Planning";
const description =
  "Accepted at IROS 2026. A geometry-conditioned diffusion policy for smooth, temporally ordered coverage path planning from raw 3D point clouds.";
const abstract =
  "Diffusion models have shown strong potential for robot skill learning, yet their role in coverage path planning remains underexplored. In industrial surface processing (painting, polishing, spray coating), high coverage requires globally ordered, temporally coherent trajectories rather than stitching unordered local segments. We reformulate coverage path planning as conditional sequence generation and adopt a geometry-conditioned diffusion framework that synthesizes continuous trajectories directly from raw 3D point clouds. Our method produces temporally ordered trajectory chunks and avoids post-hoc heuristic ordering or stitching in prior learning-based methods via simple sequential concatenation, improving sequence-level consistency. A single shared policy generalizes across different geometries without category-specific architectures. Extensive benchmarks show substantial gains over prior learning-based baselines: 98.2% lower point-wise Chamfer Distance (lower is better), 97.0% lower jerk (smoother trajectories), and +67.5 percentage points overlapping surface coverage on average.";
const canonicalUrl = "https://crystalccy1.github.io/3D-CovDiffusion/";
const arxivUrl = "https://arxiv.org/abs/2510.03011";
const githubUrl = "https://github.com/crystalccy1/3D-CovDiffusion";
const pdfUrl = `${canonicalUrl}3d-covdiffusion-paper.pdf`;
const authorNames = [
  "Chenyuan Chen",
  "Haoran Ding",
  "Ran Ding",
  "Tianyu Liu",
  "Zewen He",
  "Anqing Duan",
  "Yoshihiko Nakamura",
];

const people = authorNames.map((name) => ({ "@type": "Person", name }));
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ScholarlyArticle",
      "@id": `${canonicalUrl}#paper`,
      url: canonicalUrl,
      mainEntityOfPage: canonicalUrl,
      name: title,
      headline: title,
      description,
      abstract,
      inLanguage: "en",
      datePublished: "2026",
      creativeWorkStatus: "Accepted at IROS 2026",
      author: people,
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "arXiv",
          value: "2510.03011",
        },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: "10.48550/arXiv.2510.03011",
        },
      ],
      sameAs: [
        arxivUrl,
        "https://doi.org/10.48550/arXiv.2510.03011",
      ],
      keywords: [
        "coverage path planning",
        "diffusion policy",
        "robotics",
        "3D point clouds",
        "trajectory generation",
      ],
      image: {
        "@type": "ImageObject",
        url: `${canonicalUrl}og.png`,
        width: 1731,
        height: 909,
      },
      isAccessibleForFree: true,
      encoding: {
        "@type": "MediaObject",
        contentUrl: pdfUrl,
        encodingFormat: "application/pdf",
      },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${githubUrl}#software`,
      name: "3D-CovDiffusion",
      description:
        "Official implementation of 3D-CovDiffusion: 3D-Aware Diffusion Policy for Coverage Path Planning.",
      url: githubUrl,
      codeRepository: githubUrl,
      programmingLanguage: "Python",
      runtimePlatform:
        "Linux x86_64; Python 3.10.18; PyTorch 1.13.1 with CUDA 11.7",
      license: `${githubUrl}/blob/main/LICENSE`,
      author: people,
      isBasedOn: { "@id": `${canonicalUrl}#paper` },
    },
  ],
};

const citationMetadata = [
  '<!-- 3D-CovDiffusion scholarly metadata -->',
  '<meta name="robots" content="index,follow,max-image-preview:large"/>',
  `<meta name="citation_title" content="${title}"/>`,
  ...authorNames.map(
    (name) => `<meta name="citation_author" content="${name}"/>`,
  ),
  '<meta name="citation_publication_date" content="2026"/>',
  '<meta name="citation_conference_title" content="2026 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)"/>',
  `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`,
].join("");

function occurrenceCount(value, needle) {
  return value.split(needle).length - 1;
}

function replaceExactlyOnce(value, oldText, newText, label) {
  if (value.includes(newText)) return value;
  assert.equal(
    occurrenceCount(value, oldText),
    1,
    `Expected exactly one ${label} replacement target`,
  );
  return value.replace(oldText, newText);
}

function addArxivButtons(value) {
  if (value.includes('aria-label="arXiv paper: 3D-CovDiffusion"')) {
    return value;
  }

  let paperButtonCount = 0;
  const updated = value.replace(
    /<a class="resource-pill" href="\/3D-CovDiffusion\/3d-covdiffusion-paper\.pdf"[\s\S]*?<\/a>/g,
    (paperButton) => {
      paperButtonCount += 1;
      const arxivButton = paperButton
        .replace(
          'href="/3D-CovDiffusion/3d-covdiffusion-paper.pdf"',
          `href="${arxivUrl}"`,
        )
        .replace(
          'aria-label="Paper: IROS 2026 paper"',
          'aria-label="arXiv paper: 3D-CovDiffusion"',
        )
        .replace('rel="noreferrer"', 'rel="noopener noreferrer"')
        .replace(">Paper</a>", ">arXiv</a>");
      return `${paperButton}${arxivButton}`;
    },
  );

  assert.equal(paperButtonCount, 2, "Expected the two existing Paper buttons");
  return updated;
}

function updatePage(original) {
  let html = original;

  html = replaceExactlyOnce(
    html,
    "<title>3D-CovDiffusion — 3D-Aware Diffusion Policy</title>",
    `<title>${title}</title>`,
    "document title",
  );
  html = replaceExactlyOnce(
    html,
    '<meta property="og:title" content="3D-CovDiffusion"/>',
    `<meta property="og:title" content="${title}"/>`,
    "Open Graph title",
  );
  html = replaceExactlyOnce(
    html,
    '<meta name="twitter:title" content="3D-CovDiffusion"/>',
    `<meta name="twitter:title" content="${title}"/>`,
    "Twitter title",
  );
  html = html.replace(
    `<meta name="citation_pdf_url" content="${pdfUrl}"/>`,
    "",
  );
  if (!html.includes("<!-- 3D-CovDiffusion scholarly metadata -->")) {
    html = replaceExactlyOnce(
      html,
      `<link rel="canonical" href="${canonicalUrl}"/>`,
      `${citationMetadata}<link rel="canonical" href="${canonicalUrl}"/>`,
      "canonical insertion point",
    );
  }

  html = addArxivButtons(html);
  const oldVisibleAbstractText =
    'Our method, <strong class="abstract-method-name">3D-CovDiffusion</strong>, produces';
  if (html.includes(oldVisibleAbstractText)) {
    assert.equal(occurrenceCount(html, oldVisibleAbstractText), 1);
    html = html.replace(oldVisibleAbstractText, "Our method produces");
  }
  html = replaceExactlyOnce(
    html,
    "  year   = {2026},\n  note   = {Accepted at IROS 2026}",
    "  year   = {2026},\n  eprint = {2510.03011},\n  archivePrefix = {arXiv},\n  primaryClass  = {cs.RO},\n  url    = {https://arxiv.org/abs/2510.03011},\n  note   = {Accepted at IROS 2026}",
    "project-page BibTeX",
  );

  validatePage(html);
  return html;
}

function validatePage(html) {
  assert.ok(html.includes(`<title>${title}</title>`));
  assert.equal(
    occurrenceCount(
      html,
      `<link rel="canonical" href="${canonicalUrl}"/>`,
    ),
    1,
  );
  assert.equal(occurrenceCount(html, '<meta name="citation_author"'), 7);
  assert.ok(!html.includes('name="citation_pdf_url"'));
  assert.equal(occurrenceCount(html, 'type="application/ld+json"'), 1);
  assert.equal(
    occurrenceCount(
      html,
      'aria-label="arXiv paper: 3D-CovDiffusion"',
    ),
    2,
  );
  assert.ok(html.includes(`href="${githubUrl}"`));
  assert.ok(html.includes("Our method produces temporally ordered"));
  assert.ok(!html.includes('class="abstract-method-name"'));
  assert.ok(html.includes("archivePrefix = {arXiv}"));
  assert.equal(occurrenceCount(html, "<video"), 9);
  assert.ok(html.includes('id="comparison-video-controls"'));
  assert.ok(html.includes('id="abstract"'));
  assert.ok(html.includes('id="videos"'));
  assert.ok(!html.includes("anonymous.4open.science"));

  const visibleAbstractMatch = html.match(
    /<div class="abstract-copy"><p>([\s\S]*?)<\/p><\/div>/,
  );
  assert.ok(visibleAbstractMatch, "Missing visible Abstract text");
  assert.equal(visibleAbstractMatch[1], abstract);

  const jsonLdMatch = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(jsonLdMatch, "Missing JSON-LD");
  const parsedJsonLd = JSON.parse(jsonLdMatch[1]);
  assert.equal(parsedJsonLd["@graph"][0]["@type"], "ScholarlyArticle");
  assert.equal(parsedJsonLd["@graph"][1]["@type"], "SoftwareSourceCode");
  assert.deepEqual(
    parsedJsonLd["@graph"][0].author.map(({ name }) => name),
    authorNames,
  );
  assert.ok(parsedJsonLd["@graph"][0].sameAs.includes(arxivUrl));
  assert.equal(parsedJsonLd["@graph"][1].codeRepository, githubUrl);
}

const updatedPages = pageFiles.map((pageFile) => {
  const original = readFileSync(pageFile, "utf8");
  const updated = updatePage(original);
  writeFileSync(pageFile, updated, "utf8");
  return updated;
});

assert.equal(
  updatedPages[0],
  updatedPages[1],
  "index.html and 404.html must remain identical",
);

console.log("Updated and validated 3D-CovDiffusion SEO metadata and links.");
