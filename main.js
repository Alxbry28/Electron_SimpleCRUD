const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

const Repositories = require("./repository/repositories");
Repositories.syncRepo();

const menuItems = [
  {
    label: "Menu",
    submenu: [{ label: "about" }],
  },
  {
    label: "File",
    submenu: [{ label: "Exit" }],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    // width: 800,
    // height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.webContents.openDevTools();
  win.maximize();
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
