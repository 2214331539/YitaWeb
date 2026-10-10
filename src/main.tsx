import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import ThunderbirdLanding from "./pages/ThunderbirdLanding";
import "./styles/thunderbird/base.less";
import "./styles/yita-thunderbird.css";
import "./styles/yita-guides.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <ThunderbirdLanding />
  </StrictMode>
);

if (
  import.meta.env.DEV &&
  /\/(windows|mac|faq)\.html$/.test(location.pathname)
) {
  const [{ default: GuidePage }, { guidePages }] = await Promise.all([
    import("./pages/guides/GuidePage"),
    import("./pages/guides/content"),
  ]);
  const page = guidePages.find((page) =>
    location.pathname.endsWith(`/${page.file}`),
  )!;
  document.title = page.title;
  document.body.className = "page-guide";
  createRoot(root).render(<GuidePage page={page} />);
} else if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
