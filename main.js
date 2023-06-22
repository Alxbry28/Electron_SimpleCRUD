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

    // win.webContents.openDevTools();
    // win.loadFile('index.html');
    win.loadFile(path.join(__dirname,'./windows/one.html'));

    const win2 = new BrowserWindow({
        width: 800,
        height: 600
    
    });

    // win2.webContents.openDevTools();
    // win2.loadFile('index.html');
    win2.loadFile(path.join(__dirname,'./windows/two.html'));

};

app.whenReady().then(() => {
    createWindow();
});



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});