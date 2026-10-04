# Yita Web

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

## Active source

- src/main.tsx: React entry and the two active stylesheet imports.
- src/pages/ThunderbirdLanding.tsx: source-derived section structure and Yita content; navigation, platform chooser, screenshot tabs and native image dialog.
- src/styles/thunderbird/base.less: selected original Thunderbird source modules.
- src/styles/thunderbird/upstream/: original LESS files, with two documented asset-path substitutions.
- src/styles/yita-thunderbird.css: brand palette, screenshot composition, responsive behavior and motion.
- src/pages/home/product.ts: version, repository, download URLs and platform guides. Also update the noscript links in index.html when changing the release.
- public/assets/screenshots/: the four supplied screenshots. CSS composes and crops them without altering the originals.
- public/assets/yita-{icon-128,mascot}.png: local Yita branding.

Current download: v0.9.0-preview.1 for Windows 10 1809+ / 11 x64 and macOS 12+ Apple Silicon. The Mac build remains a preview requiring real-device validation. Text must be selectable/copyable; OCR is not advertised.

## UI behavior

The navigation contracts after scrolling. Menus work with pointer and keyboard, close on Escape and outside clicks, and collapse on mobile. Screenshot tabs support arrow keys and Home/End. Native dialogs support Escape, focus containment and return focus. Downloads link directly to the release installers; the chooser states platform architecture and setup requirements.

The three hero screenshots unfold with scrolling: the outer panels rise, spread and straighten while the center panel lifts further. A passive scroll listener and requestAnimationFrame update a local CSS variable without React re-renders; the motion reverses when scrolling back and stops updating once settled. The range follows the hero/viewport size and mobile uses a narrower spread. Reduced-motion preference changes disable the effect immediately. Other motion includes small scroll entrances, screenshot fades, floating decorative elements, hover feedback and dialog transitions. Product screenshots do not autoplay.

## Source and licenses

See SOURCE-NOTICE.md for the exact upstream commit, source mapping and licenses. Covered adaptations retain MPL-2.0. Fonts retain their separate OFL/Unlicense notices. public/source/yita-website-source.zip ships the corresponding code with the static build; regenerate it after source changes before deployment.

The preceding CreatorHub page is preserved locally at .references/yita-before-thunderbird-20261004/ (excluded from Git). Old components/styles remain available but are not imported by the active page. The website does not modify InstantTranslate or CreatorHub.

## Checks

npm run build runs TypeScript and the production build. npm run format:check checks formatting; vendored upstream LESS is excluded to preserve its source formatting. Browser validation covers responsive overflow, navigation, dialogs, screenshot switching and download destinations.
