import assert from "node:assert/strict";
import { readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = join(scriptDirectory, "..");
const projectDirectory = join(repositoryRoot, "3D-CovDiffusion");
const pageFiles = [
  join(projectDirectory, "index.html"),
  join(projectDirectory, "404.html"),
];
const pdfFile = join(projectDirectory, "3d-covdiffusion-paper.pdf");
const robotsFile = join(repositoryRoot, "robots.txt");
const sitemapFile = join(repositoryRoot, "sitemap.xml");
const checkOnly = process.argv.includes("--check");

const paper = {
  name: "3D-CovDiffusion",
  aliases: ["3D CovDiffusion", "CovDiffusion", "3DCovDiffusion"],
  title: "3D-CovDiffusion: 3D-Aware Diffusion Policy for Coverage Path Planning",
  description:
    "3D-CovDiffusion is an IROS 2026 diffusion policy for learning-based 6-DoF coverage path planning from 3D point clouds in robotic painting, coating, and polishing.",
  abstract:
    "Diffusion models have shown strong potential for robot skill learning, yet their role in coverage path planning remains underexplored. In industrial surface processing (painting, polishing, spray coating), high coverage requires globally ordered, temporally coherent trajectories rather than stitching unordered local segments. We reformulate coverage path planning as conditional sequence generation and adopt a geometry-conditioned diffusion framework that synthesizes continuous trajectories directly from raw 3D point clouds. Our method produces temporally ordered trajectory chunks and avoids post-hoc heuristic ordering or stitching in prior learning-based methods via simple sequential concatenation, improving sequence-level consistency. A single shared policy generalizes across different geometries without category-specific architectures. Extensive benchmarks show substantial gains over prior learning-based baselines: 98.2% lower point-wise Chamfer Distance (lower is better), 97.0% lower jerk (smoother trajectories), and +67.5 percentage points overlapping surface coverage on average.",
  methodSummary:
    "3D-CovDiffusion conditions iterative trajectory denoising on a raw 3D point cloud and recent motion history to generate temporally ordered 6-DoF trajectory chunks, which are concatenated sequentially into a coverage path.",
  canonicalUrl: "https://crystalccy1.github.io/3D-CovDiffusion/",
  arxivId: "2510.03011",
  arxivUrl: "https://arxiv.org/abs/2510.03011",
  arxivDoi: "10.48550/arXiv.2510.03011",
  pdfUrl:
    "https://crystalccy1.github.io/3D-CovDiffusion/3d-covdiffusion-paper.pdf",
  githubUrl: "https://github.com/crystalccy1/3D-CovDiffusion",
  modelUrl: "https://huggingface.co/ChenyuanC/3D-CovDiffusion",
  datasetUrl:
    "https://huggingface.co/datasets/ChenyuanC/3D-CovDiffusion-Train-Ready",
  firstPublished: "2025-10-03",
  lastModified: "2026-09-06",
  authors: [
    "Chenyuan Chen",
    "Haoran Ding",
    "Ran Ding",
    "Tianyu Liu",
    "Zewen He",
    "Anqing Duan",
    "Yoshihiko Nakamura",
  ],
  keywords: [
    "coverage path planning",
    "diffusion policy",
    "industrial robotics",
    "robotic spray painting",
    "spray coating",
    "robotic polishing",
    "3D point clouds",
    "6-DoF trajectory generation",
    "sequence-level trajectory generation",
    "robot learning",
  ],
};

const releaseScope =
  "The paper reports a jointly trained, category-agnostic model. The current public v1.0.0 release provides separately trained checkpoints for Windows, Cuboids, Shelves, and Containers and documents the checkpoint-producing saved configuration.";

const researchQuestions = [
  {
    question: "What problem does 3D-CovDiffusion solve?",
    answer:
      `${paper.methodSummary} It targets industrial surface-processing tasks such as robotic painting, spray coating, and polishing.`,
  },
  {
    question:
      "How does 3D-CovDiffusion differ from point-wise and segment-wise coverage planners?",
    answer:
      "It models trajectory order during sequence generation instead of predicting unordered poses or local strokes that require a separate heuristic sorting or stitching stage. The paper reports lower point-wise Chamfer Distance and translational jerk together with higher overlapping surface coverage than prior learning-based baselines.",
  },
  {
    question: "What exactly is available in the public release?",
    answer:
      `${releaseScope} The release includes source code, pretrained category checkpoints, 2,470 training episodes, and 618 fixed-test cases.`,
  },
];

const people = paper.authors.map((name) => ({ "@type": "Person", name }));
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ScholarlyArticle",
      "@id": `${paper.canonicalUrl}#paper`,
      url: paper.canonicalUrl,
      mainEntityOfPage: paper.canonicalUrl,
      name: paper.title,
      alternateName: paper.aliases,
      headline: paper.title,
      description: paper.description,
      abstract: paper.abstract,
      inLanguage: "en",
      datePublished: paper.firstPublished,
      dateModified: "2026-08-02",
      creativeWorkStatus: "Accepted at IROS 2026",
      author: people,
      identifier: [
        {
          "@type": "PropertyValue",
          propertyID: "arXiv",
          value: paper.arxivId,
          url: paper.arxivUrl,
        },
        {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: paper.arxivDoi,
          url: `https://doi.org/${paper.arxivDoi}`,
        },
      ],
      sameAs: [paper.arxivUrl, `https://doi.org/${paper.arxivDoi}`],
      about: [
        { "@type": "Thing", name: "Coverage path planning" },
        { "@type": "Thing", name: "Industrial surface processing" },
        { "@type": "Thing", name: "Robotic spray painting" },
        { "@type": "Thing", name: "3D point-cloud trajectory generation" },
      ],
      keywords: paper.keywords,
      image: {
        "@type": "ImageObject",
        url: `${paper.canonicalUrl}og.png`,
        width: 1731,
        height: 909,
      },
      isAccessibleForFree: true,
      encoding: {
        "@type": "MediaObject",
        contentUrl: paper.pdfUrl,
        encodingFormat: "application/pdf",
      },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${paper.githubUrl}#software`,
      name: paper.name,
      alternateName: paper.aliases,
      description:
        "Public research software for training and evaluating 3D-CovDiffusion. The v1.0.0 release provides separately trained category checkpoints for Windows, Cuboids, Shelves, and Containers.",
      url: paper.githubUrl,
      codeRepository: paper.githubUrl,
      downloadUrl: `${paper.githubUrl}/releases/tag/v1.0.0`,
      softwareVersion: "1.0.0",
      datePublished: "2026-08-02",
      programmingLanguage: "Python",
      runtimePlatform:
        "Linux x86_64; Python 3.10.18; PyTorch 1.13.1 with CUDA 11.7",
      applicationCategory: "Robotics research software",
      keywords: paper.keywords,
      license: `${paper.githubUrl}/blob/main/LICENSE`,
      author: people,
      isBasedOn: { "@id": `${paper.canonicalUrl}#paper` },
      sameAs: [paper.modelUrl],
    },
    {
      "@type": "Dataset",
      "@id": `${paper.datasetUrl}#dataset`,
      name: "3D-CovDiffusion Train-Ready Dataset",
      description:
        "Train-ready point-cloud and ordered 6-DoF trajectory data with 2,470 training episodes and 618 self-contained fixed-test cases across Windows, Cuboids, Shelves, and Containers.",
      url: paper.datasetUrl,
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: people,
      keywords: paper.keywords,
      subjectOf: { "@id": `${paper.canonicalUrl}#paper` },
    },
    {
      "@type": "FAQPage",
      "@id": `${paper.canonicalUrl}#research-guide`,
      mainEntity: researchQuestions.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

const scholarlyMetadataStart =
  "<!-- 3D-CovDiffusion scholarly metadata -->";
const scholarlyMetadataEnd =
  "<!-- /3D-CovDiffusion scholarly metadata -->";
const scholarlyMetadata = [
  scholarlyMetadataStart,
  '<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"/>',
  `<meta name="citation_title" content="${paper.title}"/>`,
  ...paper.authors.map(
    (name) => `<meta name="citation_author" content="${name}"/>`,
  ),
  '<meta name="citation_publication_date" content="2026"/>',
  '<meta name="citation_conference_title" content="2026 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)"/>',
  `<meta name="citation_arxiv_id" content="${paper.arxivId}"/>`,
  '<meta name="citation_language" content="en"/>',
  `<meta name="citation_keywords" content="${paper.keywords.join("; ")}"/>`,
  `<meta name="citation_abstract_html_url" content="${paper.canonicalUrl}"/>`,
  `<meta name="citation_pdf_url" content="${paper.pdfUrl}"/>`,
  `<link rel="alternate" type="application/pdf" title="${paper.title}" href="${paper.pdfUrl}"/>`,
  `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`,
  scholarlyMetadataEnd,
].join("");

const researchGuideStart = "<!-- 3D-CovDiffusion research guide -->";
const researchGuideEnd = "<!-- /3D-CovDiffusion research guide -->";
const researchGuide = `${researchGuideStart}<section class="paper-section" id="research-guide"><div class="content-wide"><header class="section-heading"><h2>Method at a glance</h2></header><p class="section-intro">${paper.methodSummary}</p><div class="method-notes">${researchQuestions
  .map(
    ({ question, answer }) =>
      `<article><h3>${question}</h3><p>${answer}</p></article>`,
  )
  .join("")}</div></div></section>${researchGuideEnd}`;

const robotsText = `User-agent: OAI-SearchBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://crystalccy1.github.io/sitemap.xml
`;

const sitemapText = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${paper.canonicalUrl}</loc>
    <lastmod>${paper.lastModified}</lastmod>
  </url>
  <url>
    <loc>${paper.pdfUrl}</loc>
    <lastmod>${paper.lastModified}</lastmod>
  </url>
</urlset>
`;

function occurrenceCount(value, needle) {
  return value.split(needle).length - 1;
}

function escapeRegularExpression(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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

function replaceTagContent(value, tagPattern, replacement, label) {
  const matches = value.match(new RegExp(tagPattern.source, "gi")) ?? [];
  assert.equal(matches.length, 1, `Expected exactly one ${label}`);
  return value.replace(tagPattern, replacement);
}

function replaceMeta(value, attribute, key, content) {
  const pattern = new RegExp(
    `<meta ${attribute}="${escapeRegularExpression(key)}" content="[^"]*"\\/>`,
    "i",
  );
  return replaceTagContent(
    value,
    pattern,
    `<meta ${attribute}="${key}" content="${content}"/>`,
    `${key} metadata tag`,
  );
}

function upsertScholarlyMetadata(value) {
  if (value.includes(scholarlyMetadataStart)) {
    const pattern = new RegExp(
      `${escapeRegularExpression(scholarlyMetadataStart)}[\\s\\S]*?(?:${escapeRegularExpression(scholarlyMetadataEnd)})?(?=<link rel="canonical" href="${escapeRegularExpression(paper.canonicalUrl)}"\\/>)`,
    );
    assert.match(value, pattern, "Malformed scholarly metadata block");
    return value.replace(pattern, scholarlyMetadata);
  }

  return replaceExactlyOnce(
    value,
    `<link rel="canonical" href="${paper.canonicalUrl}"/>`,
    `${scholarlyMetadata}<link rel="canonical" href="${paper.canonicalUrl}"/>`,
    "canonical insertion point",
  );
}

function upsertResearchGuide(value) {
  if (value.includes(researchGuideStart)) {
    const pattern = new RegExp(
      `${escapeRegularExpression(researchGuideStart)}[\\s\\S]*?${escapeRegularExpression(researchGuideEnd)}`,
    );
    assert.match(value, pattern, "Malformed research-guide block");
    return value.replace(pattern, researchGuide);
  }

  const resourcesSection =
    '<section class="paper-section section-tint" id="resources">';
  return replaceExactlyOnce(
    value,
    resourcesSection,
    `${researchGuide}${resourcesSection}`,
    "research-guide insertion point",
  );
}

function addArxivButtons(value) {
  if (
    occurrenceCount(
      value,
      'aria-label="arXiv paper: 3D-CovDiffusion"',
    ) === 2
  ) {
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
          `href="${paper.arxivUrl}"`,
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

  html = replaceTagContent(
    html,
    /<title>[\s\S]*?<\/title>/i,
    `<title>${paper.title}</title>`,
    "document title",
  );
  html = replaceMeta(html, "name", "description", paper.description);
  html = replaceMeta(html, "name", "keywords", paper.keywords.join(","));
  html = replaceMeta(html, "property", "og:title", paper.title);
  html = replaceMeta(html, "property", "og:description", paper.description);
  html = replaceMeta(html, "name", "twitter:title", paper.title);
  html = replaceMeta(html, "name", "twitter:description", paper.description);
  html = upsertScholarlyMetadata(html);
  html = addArxivButtons(html);

  const oldVisibleAbstractText =
    'Our method, <strong class="abstract-method-name">3D-CovDiffusion</strong>, produces';
  if (html.includes(oldVisibleAbstractText)) {
    assert.equal(occurrenceCount(html, oldVisibleAbstractText), 1);
    html = html.replace(oldVisibleAbstractText, "Our method produces");
  }

  html = replaceExactlyOnce(
    html,
    '<h3>Cross-geometry policy</h3><p>One policy generates coherent paths across windows, cuboids, shelves, and a low-data container setting.</p>',
    '<h3>Shared architecture</h3><p>The paper reports a joint model; the public release supplies separately trained category checkpoints with a common geometry- and history-conditioned architecture.</p>',
    "release-scope contribution card",
  );
  html = upsertResearchGuide(html);
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
  assert.equal(occurrenceCount(html, `<title>${paper.title}</title>`), 1);
  assert.equal(
    occurrenceCount(
      html,
      `<link rel="canonical" href="${paper.canonicalUrl}"/>`,
    ),
    1,
  );
  assert.equal(occurrenceCount(html, '<meta name="citation_author"'), 7);
  assert.equal(
    occurrenceCount(
      html,
      `<meta name="citation_pdf_url" content="${paper.pdfUrl}"/>`,
    ),
    1,
  );
  assert.equal(occurrenceCount(html, 'type="application/ld+json"'), 1);
  assert.equal(
    occurrenceCount(
      html,
      'aria-label="arXiv paper: 3D-CovDiffusion"',
    ),
    2,
  );
  assert.ok(html.includes(`href="${paper.githubUrl}"`));
  assert.ok(html.includes("Our method produces temporally ordered"));
  assert.ok(!html.includes('class="abstract-method-name"'));
  assert.ok(html.includes("archivePrefix = {arXiv}"));
  assert.equal(occurrenceCount(html, "<video"), 9);
  assert.ok(html.includes('id="comparison-video-controls"'));
  assert.ok(html.includes('id="abstract"'));
  assert.ok(html.includes('id="videos"'));
  assert.equal(occurrenceCount(html, 'id="research-guide"'), 1);
  assert.ok(html.includes("public v1.0.0 release provides separately trained"));
  assert.ok(!html.includes("anonymous.4open.science"));

  const visibleAbstractMatch = html.match(
    /<div class="abstract-copy"><p>([\s\S]*?)<\/p><\/div>/,
  );
  assert.ok(visibleAbstractMatch, "Missing visible Abstract text");
  assert.equal(visibleAbstractMatch[1], paper.abstract);

  const jsonLdMatch = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(jsonLdMatch, "Missing JSON-LD");
  const parsedJsonLd = JSON.parse(jsonLdMatch[1]);
  const graphTypes = parsedJsonLd["@graph"].map((entry) => entry["@type"]);
  assert.deepEqual(graphTypes, [
    "ScholarlyArticle",
    "SoftwareSourceCode",
    "Dataset",
    "FAQPage",
  ]);
  assert.deepEqual(
    parsedJsonLd["@graph"][0].author.map(({ name }) => name),
    paper.authors,
  );
  assert.ok(parsedJsonLd["@graph"][0].sameAs.includes(paper.arxivUrl));
  assert.equal(parsedJsonLd["@graph"][1].codeRepository, paper.githubUrl);
  assert.equal(parsedJsonLd["@graph"][2].url, paper.datasetUrl);
  assert.deepEqual(
    parsedJsonLd["@graph"][3].mainEntity.map(({ name }) => name),
    researchQuestions.map(({ question }) => question),
  );
}

function writeOrCheck(file, expected) {
  if (checkOnly) {
    assert.equal(readFileSync(file, "utf8"), expected, `${file} is stale`);
    return;
  }
  writeFileSync(file, expected, "utf8");
}

const updatedPages = pageFiles.map((pageFile) => {
  const original = readFileSync(pageFile, "utf8");
  const updated = updatePage(original);
  if (checkOnly) {
    assert.equal(original, updated, `${pageFile} is stale`);
  } else {
    writeFileSync(pageFile, updated, "utf8");
  }
  return updated;
});

assert.equal(
  updatedPages[0],
  updatedPages[1],
  "index.html and 404.html must remain identical",
);
writeOrCheck(robotsFile, robotsText);
writeOrCheck(sitemapFile, sitemapText);

const pdfSize = statSync(pdfFile).size;
assert.ok(
  pdfSize < 5_000_000,
  `Scholar-linked PDF must remain below 5 MB; found ${pdfSize} bytes`,
);
assert.equal(readFileSync(pdfFile).subarray(0, 5).toString(), "%PDF-");

console.log(
  checkOnly
    ? "3D-CovDiffusion discoverability metadata are current and valid."
    : "Updated and validated 3D-CovDiffusion discoverability metadata.",
);
