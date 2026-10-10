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
const { render, product } = await import(
  pathToFileURL(resolve(".prerender/entry-server.js")).href
);
const template = await readFile("dist/index.html", "utf8");
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("Missing prerender root.");
if (!template.includes(`href="${site.url}"`)) {
  throw new Error("Canonical URL must match site.config.json.");
}
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
    {
      "@type": "SoftwareApplication",
      "@id": `${site.url}#app`,
      name: "Yita",
      url: site.url,
      description:
        "开源桌面划词翻译工具。选中文字，在原文旁边读到译文，支持翻译追问、浮窗置顶及自定义模型连接。使用前需配置自己的模型 API Key，模型服务可能另行计费。",
      applicationCategory: "UtilitiesApplication",
      operatingSystem:
        "Windows 10 1809+ / Windows 11 (x64), macOS 12+ (Apple Silicon)",
      softwareVersion: product.version,
      downloadUrl: product.release,
      installUrl: product.guide,
      image: `${site.url}assets/yita-mascot.png`,
      screenshot: `${site.url}assets/screenshots/reading.png`,
      sameAs: product.repository,
    },
  ],
};
const json = JSON.stringify(metadata).replaceAll("<", "\\u003c");
const html = template
  .replace(marker, () => `<div id="root">${render()}</div>`)
  .replace(
    "</head>",
    `<script type="application/ld+json">${json}</script>\n</head>`,
  );
await writeFile("dist/index.html", html);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.url}</loc></url></urlset>\n`,
);
await writeFile(`dist/${site.indexNowKey}.txt`, site.indexNowKey);
await writeFile("dist/.nojekyll", "");
console.log(
  "Prerendered the homepage, structured data, sitemap and IndexNow proof.",
);
