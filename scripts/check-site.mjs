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
for (const [, value] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  if (/^(?:https?:|#|data:|mailto:)/.test(value)) continue;
  assert.ok(
    !value.startsWith("/"),
    `Asset would escape the project subdirectory: ${value}`,
  );
  const path = resolve("dist", value.split(/[?#]/)[0]);
  assert.ok(path.startsWith(dist));
  await access(path);
}
const archive = unzipSync(
  await readFile("dist/source/yita-website-source.zip"),
);
for (const path of [
  "src/pages/ThunderbirdLanding.tsx",
  "scripts/prerender.mjs",
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
