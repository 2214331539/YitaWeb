import { StrictMode } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import ThunderbirdLanding from "./pages/ThunderbirdLanding";
import { product } from "./pages/home/product";
import GuidePage from "./pages/guides/GuidePage";
import { guidePages, type GuidePageContent } from "./pages/guides/content";

export { product, guidePages };

export function renderGuide(page: GuidePageContent) {
  return renderToStaticMarkup(<GuidePage page={page} />);
}

export function render() {
  return renderToString(
    <StrictMode>
      <ThunderbirdLanding />
    </StrictMode>,
  );
}
