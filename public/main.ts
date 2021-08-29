
import {app, BrowserWindow } from 'electron'
import path from 'path';
import isDev from 'electron-is-dev';

app.on("ready", () => {
  createWindow();
})

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
      },
      icon: path.join(__dirname, "assets/icon.png")
    })
  
    if (isDev) {
      win.loadURL("http://localhost:8000");
    } else {
      win.loadURL(`file://${path.join(__dirname, "index.html")}`);
    }
}