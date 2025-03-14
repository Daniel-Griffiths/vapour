import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore - TODO: gamepad.js is not typed
import { GamepadListener } from "gamepad.js";
import { HashRouter } from "react-router-dom";
import { init } from "@noriginmedia/norigin-spatial-navigation";

import "./assets/css/main.css";
import { Routes } from "./routes.tsx";
import { Nav } from "./components/nav.tsx";

init({
  visualDebug: false,
});

// Define key mappings outside component - only created once
const KEY_MAPPINGS: Record<string, { key: string; keyCode: number }> = {
  enter: { key: "Enter", keyCode: 13 },
  esc: { key: "Escape", keyCode: 27 },
  up: { key: "ArrowUp", keyCode: 38 },
  left: { key: "ArrowLeft", keyCode: 37 },
  down: { key: "ArrowDown", keyCode: 40 },
  right: { key: "ArrowRight", keyCode: 39 },
};

export function App() {
  const pressKey = (key: string) => {
    const keyProps = KEY_MAPPINGS[key] || {
      key,
      keyCode: key.charCodeAt(0),
    };

    const keyEvent = new KeyboardEvent("keydown", {
      key: keyProps.key,
      code: keyProps.key,
      keyCode: keyProps.keyCode,
      which: keyProps.keyCode,
      bubbles: true,
      cancelable: true,
    });

    document.dispatchEvent(keyEvent);
  };

  /**
   * Listen for gamepad events and dispatch key presses
   */
  useEffect(() => {
    const listener = new GamepadListener();

    // TODO: gamepad.js is not typed
    listener.on("gamepad:button", (event: any) => {
      const { button, pressed } = event.detail;

      if (!pressed) return;

      switch (button) {
        case 12:
          return pressKey("up");
        case 13:
          return pressKey("down");
        case 14:
          return pressKey("left");
        case 15:
          return pressKey("right");
        case 0:
          return pressKey("enter");
        case 1:
          return pressKey("esc");
      }
    });

    listener.start();

    return () => {
      listener.stop();
    };
  }, []);

  return (
    <React.StrictMode>
      <HashRouter>
        <Nav />
        <Routes />
      </HashRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

window?.ipcRenderer?.on("main-process-message", (_event, message) => {
  console.log(message);
});
