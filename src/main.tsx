import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ThunderbirdLanding from "./pages/ThunderbirdLanding";
import "./styles/thunderbird/base.less";
import "./styles/yita-thunderbird.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThunderbirdLanding />
  </StrictMode>,
);
