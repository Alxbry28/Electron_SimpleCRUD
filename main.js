const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const { connection } = require("./database/mysql_db");


function testing(){
    connection.connect((err) =>{
        if(err){
            return console.log(err.stack);
        }
    
         console.log("Connected");
    });

    var query = "SELECT * FROM person";
    connection.query(query, (err, rows, fiels) => {
        if(err){
            return console.log("Error occured with the query",err);
        }
        console.log(rows);
    });

    connection.end(() =>{
         console.log("Connection ended");
    });
}

testing();

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
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "/preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
