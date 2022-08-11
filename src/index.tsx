import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Manage from "./pages/Manage";

/* istanbul ignore next */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

/* istanbul ignore next */
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="manage" element={<Manage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
