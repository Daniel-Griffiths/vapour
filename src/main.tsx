import React from "react";
import { Routes } from "./routes.tsx";
import ReactDOM from "react-dom/client";
import { Nav } from "./components/nav.tsx";
import { BrowserRouter } from "react-router-dom";
import { init } from "@noriginmedia/norigin-spatial-navigation";

import "./assets/css/main.css";

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
