import { execFileSync } from "node:child_process";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { zipSync } from "fflate";

const output = "public/source/yita-website-source.zip";
const paths = execFileSync("git", [
  "ls-files",
  "--cached",
  "--others",
  "--exclude-standard",
  "-z",
])
  .toString("utf8")
  .split("\0")
  .filter(Boolean);
const files = {};
for (const path of [...new Set(paths)].sort()) {
  if (path === output) continue;
  files[`yita-web/${path}`] = new Uint8Array(await readFile(path));
}
await mkdir("public/source", { recursive: true });
await writeFile(
  output,
  zipSync(files, { level: 6, mtime: new Date("2026-01-01T00:00:00Z") }),
);
console.log(
  `Packaged ${Object.keys(files).length} source files and license notices.`,
);
