console.log("one js");

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');

const newWindowBtn = document.getElementById('newWindowBtn');
newWindowBtn.addEventListener('click', (e) =>{
    let winThree = new BrowserWindow({
        width: 800,
        height: 600,
      });
      win.webContents.openDevTools();
      win.loadFile(path.join(__dirname, "./windows/three.html"));
});