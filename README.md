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

The build renders the React page to HTML before publication; React hydrates the same content in the browser to enable navigation, dialogs and scroll effects. Crawlers and visitors without JavaScript can read the product description and follow the main download link.

The published site includes a canonical URL, search title and description, Open Graph metadata, WebSite and SoftwareApplication structured data, and sitemap.xml. site.config.json contains the canonical site URL and the public IndexNow ownership key. The workflow notifies IndexNow after deployment; HTTP 200 or 202 means the URL was received, not that it has been indexed. Run npm run seo:submit to retry after an unsuccessful notification.

GitHub project sites cannot control the domain-root /robots.txt from a project subdirectory. Crawling is allowed by default unless the domain-root policy says otherwise; the page declares index/follow and no ineffective /YitaWeb/robots.txt is used. The sitemap is available at https://2214331539.github.io/YitaWeb/sitemap.xml.

Google Search Console, Bing Webmaster Tools and Baidu Search Resource Platform require their own account/site verification. IndexNow does not submit to Google. Search-engine inclusion and ranking are controlled by each engine and are not guaranteed. When adding a custom domain later, update site.config.json, the canonical and Open Graph URLs in index.html, and this README before publishing.

## Active source

- src/main.tsx: React hydration entry and the two active stylesheet imports.
- src/entry-server.tsx and scripts/prerender.mjs: build-time HTML rendering and search metadata.
- src/pages/ThunderbirdLanding.tsx: source-derived section structure and Yita content; navigation, platform chooser, screenshot tabs and native image dialog.
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
