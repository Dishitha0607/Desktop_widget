import { app, BrowserWindow } from "electron";

function createWindow() {
  const win = new BrowserWindow({
    width: 760,
    height: 520,

    minWidth: 700,
    minHeight: 500,

    titleBarStyle: "hidden",

    transparent: true,

    alwaysOnTop: false,

    resizable: true,
    fullscreenable: false,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL("http://localhost:5173");
}

app.whenReady().then(createWindow);