import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./createEmotionCache";
const cache = createEmotionCache();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>
);
