import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve, sep } from "node:path";
import { unzipSync } from "fflate";

const site = JSON.parse(await readFile("site.config.json", "utf8"));
const html = await readFile("dist/index.html", "utf8");
assert.equal(
  (html.match(/<h1\b/g) || []).length,
  1,
  "One visible page title is required.",
);
for (const content of [
  "轻巧桌面翻译伙伴",
  "划词翻译",
  "Windows",
  "macOS",
  "模型 API Key",
  "参与贡献",
]) {
  assert.ok(
    html.includes(content),
    `Prerendered content is missing: ${content}`,
  );
}
assert.ok(
  !html.includes('<div id="root"></div>'),
  "The page must not be an empty JavaScript shell.",
);
assert.ok(!/noindex/i.test(html));
assert.ok(html.includes(`rel="canonical" href="${site.url}"`));
const schema = JSON.parse(
  html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
);
assert.ok(
  schema["@graph"].some((item) => item["@type"] === "SoftwareApplication"),
);
assert.ok(
  schema["@graph"].some(
    (item) => item["@type"] === "WebSite" && item.url === site.url,
  ),
);
assert.ok(
  (await readFile("dist/sitemap.xml", "utf8")).includes(
    `<loc>${site.url}</loc>`,
  ),
);
assert.equal(
  await readFile(`dist/${site.indexNowKey}.txt`, "utf8"),
  site.indexNowKey,
);
const dist = resolve("dist") + sep;
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
assert.equal(
  new Set(urls).size,
  4,
  "The sitemap must include the homepage and three distinct guides.",
);
const documents = new Map();
for (const url of urls) {
  assert.ok(url.startsWith(site.url));
  const file = url.slice(site.url.length) || "index.html";
  documents.set(file, await readFile(resolve("dist", file), "utf8"));
}
const titles = new Set();
for (const [file, document] of documents) {
  const canonical =
    file === "index.html" ? site.url : new URL(file, site.url).href;
  assert.ok(document.includes(`rel="canonical" href="${canonical}"`));
  assert.ok(document.includes(`property="og:url" content="${canonical}"`));
  assert.equal((document.match(/<h1\b/g) || []).length, 1);
  assert.ok(!/noindex/i.test(document));
  const title = document.match(/<title>(.*?)<\/title>/)[1];
  assert.ok(!titles.has(title), "Page titles must be unique.");
  titles.add(title);
  if (file !== "index.html") {
    assert.ok(
      !/<script[^>]*type="module"/.test(document),
      "Static guides must not hydrate as the homepage.",
    );
    assert.ok(document.includes('aria-label="本页目录"'));
  }
  const metadata = JSON.parse(
    document.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )[1],
  );
  assert.ok(
    metadata["@graph"].some(
      (item) => item["@type"] === "WebPage" && item.url === canonical,
    ),
  );
  for (const [, value] of document.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(?:https?:|#|data:|mailto:)/.test(value)) continue;
    assert.ok(
      !value.startsWith("/"),
      `Asset would escape the project subdirectory: ${value}`,
    );
    const [localFile, fragment] = value.split("#");
    const path = resolve("dist", localFile.split("?")[0] || ".");
    assert.ok(path === resolve("dist") || path.startsWith(dist));
    await access(path);
    if (fragment) {
      const target = documents.get(
        localFile.replace(/^\.\//, "") || "index.html",
      );
      assert.ok(
        target?.includes(`id="${fragment}"`),
        `Missing fragment target: ${value}`,
      );
    }
  }
  for (const [, fragment] of document.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(
      document.includes(`id="${fragment}"`),
      `Broken in-page anchor in ${file}: ${fragment}`,
    );
  }
}
const archive = unzipSync(
  await readFile("dist/source/yita-website-source.zip"),
);
for (const path of [
  "src/pages/ThunderbirdLanding.tsx",
  "scripts/prerender.mjs",
  "src/pages/guides/content.ts",
  "src/pages/guides/GuidePage.tsx",
  "src/styles/yita-guides.css",
  "licenses/Thunderbird-MPL-2.0.txt",
]) {
  assert.deepEqual(
    Buffer.from(archive[`yita-web/${path}`]),
    await readFile(path),
  );
}
assert.ok(
  !Object.keys(archive).some((path) =>
    /(?:node_modules|\.references|\.git\/|\.env$)/.test(path),
  ),
);
console.log(
  "Static content, metadata, project paths and corresponding source archive verified.",
);
