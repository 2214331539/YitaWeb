import { readFile } from "node:fs/promises";

const site = JSON.parse(await readFile("site.config.json", "utf8"));
const keyLocation = `${site.url}${site.indexNowKey}.txt`;
const proof = await fetch(keyLocation, { signal: AbortSignal.timeout(30000) });
if (!proof.ok || (await proof.text()).trim() !== site.indexNowKey) {
  throw new Error("The public IndexNow proof is not available yet.");
}
const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(site.url).host,
    key: site.indexNowKey,
    keyLocation,
    urlList: [site.url],
  }),
  signal: AbortSignal.timeout(30000),
});
if (![200, 202].includes(response.status)) {
  throw new Error(
    `IndexNow returned HTTP ${response.status}: ${await response.text()}`,
  );
}
console.log(
  `IndexNow HTTP ${response.status}: URL received${response.status === 202 ? ", key validation pending" : ""}. This does not confirm indexing.`,
);
