import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
// Self-hosted fonts (bundled woff2 → still works offline). Specific weights
// only, to keep the payload lean. Inter = UI/body, Space Grotesk = display,
// JetBrains Mono = code.
import "@fontsource-variable/inter";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./styles/theme.css";
import "./styles/components.css";

// Auto-update the service worker so installed apps refresh on next launch.
registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
