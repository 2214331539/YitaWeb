# Source and adaptation notice

Updated: 2026-10-05

## Current homepage: Thunderbird source adaptation

Upstream: https://github.com/thunderbird/thunderbird-website
Branch: prod
Revision: 9abcd60fe6aa0626961c7a43b43581601a0a59b8
Reference UI: https://www.thunderbird.net/en-US/
License: Mozilla Public License 2.0 (MPL-2.0).

The Yita homepage directly imports the upstream LESS source, instead of approximating the page from screenshots. The Jinja page structure is adapted into React with Yita copy, assets and local interactions.

| Upstream source | Local source / use |
| --- | --- |
| sites/www.thunderbird.net/index.html | src/pages/ThunderbirdLanding.tsx: same section order, hero, device showcase, planet scene, asymmetric six-card grid, layered showcase and download CTA |
| sites/www.thunderbird.net/includes/base/page.html | Navigation classes, shrinking fixed header, community and footer arrangement |
| assets/less/new/* | src/styles/thunderbird/upstream/new/*: retained upstream source modules |
| assets/less/pages/home.less | src/styles/thunderbird/upstream/pages/home.less: homepage geometry, floating graphics, responsive rules; original hero image URLs replaced with none |
| assets/less/new/links.less | Chevron URL changed to the bundled local asset |
| media/svg/chevron-right.svg | public/assets/chevron-right.svg |
| media/img/thunderbird/new/screens/laptop-bg.webp | public/assets/laptop-frame.webp: generic device frame |
| media/fonts/Metropolis/Metropolis-Regular.woff2 | public/assets/fonts/Metropolis-Regular.woff2 |
| media/fonts/Inter/Inter-roman.var.woff2 | public/assets/fonts/Inter-roman.var.woff2 |

src/styles/thunderbird/base.less selects upstream modules. src/styles/yita-thunderbird.css supplies Yita colors, screenshots, responsive adjustments, image perspective, restrained entrance/hover motion and reduced-motion behavior. The hero also adds Yita-specific scroll-linked unfolding for the three application screenshots. The adapted page and styles remain under MPL-2.0. Original notices are retained. The full license is in licenses/Thunderbird-MPL-2.0.txt and public/licenses/.

The distributed static site includes its corresponding source at ./source/yita-website-source.zip. This archive includes the adapted React/LESS/CSS source, license files, build configuration and dependency lockfile. Product images and fonts are served beside the site in ./assets/.

Original Thunderbird logos, product screenshots, testimonials and 3D artwork have been replaced. Yita is an independent project and is not endorsed by Thunderbird or Mozilla. The original mobile showcase is adapted into a desktop translation-window composition; the page does not advertise mobile support.

## Yita assets

Four application screenshots were supplied by the user and copied without alteration to public/assets/screenshots/{settings,phrase,reading,paragraph}.png. The mascot and icon come from F:/Project/InstantTranslate/assets/branding/yita/v1. Cropped floating windows are displayed using CSS over the original screenshots; no screenshot content was generated or repainted.

## Fonts

Inter: SIL Open Font License 1.1, licenses/Inter-OFL.txt; upstream https://github.com/rsms/inter.
Metropolis: public domain / Unlicense, licenses/Metropolis-UNLICENSE.txt; original project by Chris Simpson, license retained from the dw5/Metropolis historical mirror. Both font binaries are those bundled with Thunderbird.

## Preserved earlier implementation

The previous CreatorHub adaptation is backed up at .references/yita-before-thunderbird-20261004/. Its unused source files remain in src/pages/home and src/pages/components, but the active entry does not import their layout or styles. product.ts remains the shared Yita version/link configuration.

That earlier implementation used the user's local F:/Project/CreatorHub/frontend at ad31eed2044f35f31d1f7b0963413bf96f474de8. Its landing components were ported from jnsahaj/tweakcn at a3b47b37cba97dd637de517aab52c45ec0f83456 under Apache-2.0. These existing notices and licenses are retained; this does not relicense CreatorHub as a whole. Source Sans Pro's OFL is retained for the unused earlier assets.

Package dependencies retain their individual licenses. The Yita App repository's license is separate from the website's source licenses.
