const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const menuItems = [
    {
        label: "Menu",
        submenu: [
            { label: 'about' },
        ]
    },
    {
        label: "File",
        submenu: [
            { label: 'Exit' },
        ]
    }
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '/preload.js'),
        }
    });

    win.loadFile('index.html');
};

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});