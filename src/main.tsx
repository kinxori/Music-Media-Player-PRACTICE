import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Loader from "./Loader.tsx";
import "./index.css";

const App = lazy(() => import("./App.tsx"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
