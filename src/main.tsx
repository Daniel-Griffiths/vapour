import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { init } from "@noriginmedia/norigin-spatial-navigation";

import "./assets/css/main.css";
import { Routes } from "./routes.tsx";
import { Nav } from "./components/nav.tsx";

init({
  visualDebug: false,
});

export function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Nav />
        <Routes />
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

window?.ipcRenderer?.on("main-process-message", (_event, message) => {
  console.log(message);
});
