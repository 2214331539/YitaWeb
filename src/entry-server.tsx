import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import ThunderbirdLanding from "./pages/ThunderbirdLanding";
import { product } from "./pages/home/product";

export { product };

export function render() {
  return renderToString(
    <StrictMode>
      <ThunderbirdLanding />
    </StrictMode>,
  );
}
