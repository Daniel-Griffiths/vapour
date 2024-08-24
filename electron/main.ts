import path from "node:path";
import Store from "electron-store";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";
import { app, BrowserWindow, ipcMain } from "electron";

import { Steam } from "../src/utils/steam";

const store = new Store({
  encryptionKey: "546h924sq7egPr", // todo make this unique for each user
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(process.env.VITE_PUBLIC, "logo.svg"),
    webPreferences: {
      devTools: true,
      webviewTag: true,
      nodeIntegration: true, // enable Node.js in renderer process
      contextIsolation: false, // required when using nodeIntegration
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  // Maximize the window by default
  win.maximize();

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

ipcMain.on("run-game", (_event, appid: string) => {
  const command = `steam://rungameid/${appid}`;

  switch (process.platform) {
    case "win32":
      return exec(`start ${command}`);
    case "darwin":
      return exec(`open ${command}`);
    case "linux":
      return exec(`xdg-open ${command}`);
  }
});

ipcMain.handle(
  "get-library",
  async (_event, { id, secret }: { id: string; secret: string }) => {
    const steam = new Steam(secret);

    return steam.getUserOwnedGames(id);
  }
);

ipcMain.handle("get-store-value", (_event, key) => {
  return store.get(key);
});

ipcMain.handle("set-store-value", (_event, key, value) => {
  store.set(key, value);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.whenReady().then(async () => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
