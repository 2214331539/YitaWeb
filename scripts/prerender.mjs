import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build, resolveConfig } from "vite";

const site = JSON.parse(await readFile("site.config.json", "utf8"));
const clientConfig = await resolveConfig({}, "build", "production");
await build({
  // Vite normally resolves a relative SSR base to "/"; static hydration must match the client.
  define: { "import.meta.env.BASE_URL": JSON.stringify(clientConfig.base) },
  build: {
    ssr: "src/entry-server.tsx",
    outDir: ".prerender",
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
const { render, product, guidePages, renderGuide } = await import(
  pathToFileURL(resolve(".prerender/entry-server.js")).href
);
const template = await readFile("dist/index.html", "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("Missing prerender root.");
if (!template.includes(`href="${site.url}"`)) {
  throw new Error("Canonical URL must match site.config.json.");
}
const app = {
  "@type": "SoftwareApplication",
  "@id": `${site.url}#app`,
  name: "Yita",
  url: site.url,
  description:
    "免费开源桌面划词翻译工具，支持 Windows 与 Apple Silicon Mac。需自备模型 API Key，模型服务可能另行计费。",
  applicationCategory: "UtilitiesApplication",
  operatingSystem:
    "Windows 10 1809+ / Windows 11 (x64), macOS 12+ (Apple Silicon)",
  softwareVersion: product.version,
  downloadUrl: product.release,
  installUrl: `${site.url}windows.html`,
  license: `${product.repository}/blob/v${product.version}/LICENSE`,
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    url: product.release,
    description: "Yita 软件免费下载使用；第三方模型 API 可能另行计费。",
  },
  image: `${site.url}assets/yita-mascot.png`,
  screenshot: `${site.url}assets/screenshots/reading.png`,
  sameAs: product.repository,
};
const metadata = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}#website`,
      name: "Yita",
      alternateName: "Yita 翻译",
      url: site.url,
      inLanguage: "zh-CN",
    },
    app,
    {
      "@type": "WebPage",
      "@id": `${site.url}#webpage`,
      url: site.url,
      name: "Yita 官网｜免费开源翻译工具 · Windows / Mac 划词翻译",
      inLanguage: "zh-CN",
      isPartOf: { "@id": `${site.url}#website` },
      mainEntity: { "@id": `${site.url}#app` },
    },
  ],
};
const jsonLd = (value) =>
  `<script type="application/ld+json">${JSON.stringify(value).replaceAll("<", "\\u003c")}</script>\n`;
const html = template
  .replace(marker, () => `<div id="root">${render()}</div>`)
  .replace("</head>", `${jsonLd(metadata)}</head>`);
await writeFile("dist/index.html", html);
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
function replaceMeta(html, key, value) {
  const pattern = new RegExp(
    `(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*("\\s*/?>)`,
  );
  if (!pattern.test(html)) throw new Error(`Missing metadata: ${key}`);
  return html.replace(pattern, (_, start, end) => start + escape(value) + end);
}
for (const page of guidePages) {
  const url = new URL(page.file, site.url).href;
  let document = template
    .replace(
      /<title>[\s\S]*?<\/title>/,
      () => `<title>${escape(page.title)}</title>`,
    )
    .replace(
      `rel="canonical" href="${site.url}"`,
      () => `rel="canonical" href="${url}"`,
    )
    .replace('class="page-index"', 'class="page-guide"')
    // Guides are complete static documents; they do not need homepage hydration.
    .replace(/<script\b[^>]*type="module"[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g, "")
    .replace(marker, () => `<div id="root">${renderGuide(page)}</div>`);
  for (const [key, value] of Object.entries({
    description: page.description,
    "og:title": page.title,
    "og:description": page.description,
    "og:url": url,
  }))
    document = replaceMeta(document, key, value);
  document = document.replace(
    "</head>",
    () =>
      `${jsonLd({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            name: page.title,
            description: page.description,
            url,
            inLanguage: "zh-CN",
            isPartOf: { "@id": `${site.url}#website` },
            about: { "@id": `${site.url}#app` },
            breadcrumb: { "@id": `${url}#breadcrumb` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Yita 官网",
                item: site.url,
              },
              { "@type": "ListItem", position: 2, name: page.label, item: url },
            ],
          },
          app,
        ],
      })}</head>`,
  );
  await writeFile(`dist/${page.file}`, document);
}
const urls = [
  site.url,
  ...guidePages.map((page) => new URL(page.file, site.url).href),
];
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${escape(url)}</loc></url>`).join("\n")}\n</urlset>\n`,
);
await writeFile(`dist/${site.indexNowKey}.txt`, site.indexNowKey);
await writeFile("dist/.nojekyll", "");
console.log(
  `Prerendered ${urls.length} pages, structured data, sitemap and IndexNow proof.`,
);
