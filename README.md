# Yita Web

[Visit the Yita website](https://2214331539.github.io/YitaWeb/) · [Download Yita](https://github.com/2214331539/Yita/releases) · [Application source](https://github.com/2214331539/Yita)

Static download and open-source project homepage for Yita. The current design directly adapts Thunderbird's official homepage source, with Yita's lake green, ivory palette, mascot, and four real application screenshots.

## Development

Clone this repository, then run:

```sh
cd YitaWeb
npm ci
npm run dev
```

Open http://127.0.0.1:4173/ or run Start-Yita-Web.cmd. The dev server uses a fixed port.

```powershell
npm run build
npm run preview
```

Deploy the entire dist/ directory to a static host. Vite uses a relative base path, so subdirectory hosting works. No backend or translation API is used by this website. The desktop app requires a user-supplied model API key.

## Free hosting and search discovery

The official URL is https://2214331539.github.io/YitaWeb/. GitHub Pages serves the site with HTTPS from this public repository, using standard GitHub-hosted Ubuntu runners. No purchased domain, server, or paid service is required.

In repository Settings → Pages, the publishing source is GitHub Actions. The workflow in .github/workflows/deploy.yml builds and validates pushes to main, then deploys dist/. It can also be run manually from Actions.

The build renders four pages to HTML before publication. React hydrates the homepage to enable navigation, dialogs and scroll effects. The Windows guide (windows.html), Mac guide (mac.html) and free-use FAQ (faq.html) are complete static documents with native expandable answers and no hydration JavaScript. Crawlers and visitors without JavaScript can read all content and follow downloads and internal links. The guides are also available through the Vite development server.

Every page has a distinct canonical URL, search title, description and Open Graph metadata. Structured data describes the application, pages and guide breadcrumbs. SoftwareApplication identifies the software as free while disclosing possible third-party model API costs, matching the visible content. sitemap.xml lists all four pages. site.config.json contains the canonical site URL and the public IndexNow ownership key. The workflow reads the deployed sitemap and notifies IndexNow about every listed URL after deployment; HTTP 200 or 202 means the URLs were received, not that they have been indexed. Run npm run seo:submit to retry after an unsuccessful notification.

GitHub project sites cannot control the domain-root /robots.txt from a project subdirectory. The sitemap declaration for this site is maintained separately in robots.txt in 2214331539/2214331539.github.io (master). It points crawlers to https://2214331539.github.io/YitaWeb/sitemap.xml without changing permissions for the personal homepage. No ineffective /YitaWeb/robots.txt is used.

Google Search Console, Bing Webmaster Tools and Baidu Search Resource Platform require their own account/site verification. IndexNow does not submit to Google. Search-engine inclusion and ranking are controlled by each engine and are not guaranteed. When adding a custom domain later, update site.config.json, the canonical and Open Graph URLs in index.html, and this README before publishing.

Free owner verification and manual submissions:

- Google: open https://search.google.com/search-console and add the URL-prefix property https://2214331539.github.io/YitaWeb/. Choose HTML-file verification; place the exact supplied file in public/, build and deploy, then verify. Submit sitemap.xml under Sitemaps, and inspect the homepage URL to request indexing. DNS verification is not needed for a URL-prefix property.
- Bing: open https://www.bing.com/webmasters/, add the site and verify using the supplied file or import an already verified Google property. Submit the sitemap there to inspect crawl/indexing status. The automatic IndexNow notification works separately from this dashboard.
- Baidu: open https://ziyuan.baidu.com/, add and verify the site using the file or HTML tag supplied by the platform, then use the ordinary URL-submission method available to that verified property. Baidu may require verification at the host root; in that case publish its exact verification file in the personal Pages repository. Account eligibility and available submission methods are controlled by Baidu; IndexNow does not replace this step.

Never put account passwords, cookies or submission API tokens in this public repository. HTML ownership-verification files and the IndexNow key are intentionally public proofs. Do not use paid submission services or promise a ranking. The project's official app README links to the homepage and platform guides so users and crawlers can find the canonical site.

The owner's Google verification tag is included in index.html and preserved in every prerendered page. Bing's supplied XML proof is published as public/BingSiteAuth.xml, and mirrored at the domain root in the personal Pages repository for verification flows that check the host root. Keep these public proofs in place after verification. Publishing proofs does not itself complete verification inside the webmaster accounts.

## Active source

- src/main.tsx: React hydration entry and the two active stylesheet imports.
- src/entry-server.tsx and scripts/prerender.mjs: build-time HTML rendering and search metadata.
- src/pages/ThunderbirdLanding.tsx: source-derived section structure and Yita content; navigation, platform chooser, screenshot tabs and native image dialog.
- src/pages/guides/content.ts and GuidePage.tsx: version-aligned platform and FAQ content, rendered as independent static pages with unique metadata.
- src/styles/yita-guides.css: shared brand treatment for the guide pages and homepage guide links.
- src/styles/thunderbird/base.less: selected original Thunderbird source modules.
- src/styles/thunderbird/upstream/: original LESS files, with two documented asset-path substitutions.
- src/styles/yita-thunderbird.css: brand palette, screenshot composition, responsive behavior and motion.
- src/pages/home/product.ts: version, repository, download URLs and platform guides; structured data uses the same release metadata.
- public/assets/screenshots/: the four supplied screenshots. CSS composes and crops them without altering the originals.
- public/assets/yita-{icon-128,mascot}.png: local Yita branding.

Current download: v0.9.0-preview.3 for Windows 10 1809+ / 11 x64 and macOS 12+ Apple Silicon. The Mac build remains a preview requiring real-device validation. Text must be selectable/copyable; OCR is not advertised.

## UI behavior

The navigation contracts after scrolling. Menus work with pointer and keyboard, close on Escape and outside clicks, and collapse on mobile. Screenshot tabs support arrow keys and Home/End. Native dialogs support Escape, focus containment and return focus. Downloads link directly to the release installers; the chooser states platform architecture and setup requirements.

The three hero screenshots unfold with scrolling: the outer panels rise, spread and straighten while the center panel lifts further. A passive scroll listener and requestAnimationFrame update a local CSS variable without React re-renders; the motion reverses when scrolling back and stops updating once settled. The range follows the hero/viewport size and mobile uses a narrower spread. Reduced-motion preference changes disable the effect immediately. Other motion includes small scroll entrances, screenshot fades, floating decorative elements, hover feedback and dialog transitions. Product screenshots do not autoplay.

## Source and licenses

See SOURCE-NOTICE.md for the exact upstream commit, source mapping and licenses. Covered adaptations retain MPL-2.0. Fonts retain their separate OFL/Unlicense notices. npm run build regenerates public/source/yita-website-source.zip from the current tracked and unignored source files, excluding the archive itself, then ships it with the static build.

The preceding CreatorHub page is preserved locally at .references/yita-before-thunderbird-20261004/ (excluded from Git). Old components/styles remain available but are not imported by the active page. The website does not modify InstantTranslate or CreatorHub.

## Checks

npm run build runs TypeScript, source packaging, the production build, HTML prerendering and static checks for crawlable content, metadata, subdirectory asset paths and corresponding source. npm run format:check checks formatting; vendored upstream LESS is excluded to preserve its source formatting. Browser validation covers responsive overflow, hydration, navigation, dialogs, screenshot switching and download destinations.
