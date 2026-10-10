import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import ThunderbirdLanding from "./pages/ThunderbirdLanding";
import "./styles/thunderbird/base.less";
import "./styles/yita-thunderbird.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <ThunderbirdLanding />
  </StrictMode>
);

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
