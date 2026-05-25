import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.css";
import "./vendor/normalize.css";
import "./vendor/fonts.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
