const { app, BrowserWindow} = require("electron");
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'app-inspiracao', 'logo.png'),
    });

    win.loadFile("index.html");
}

app.whenReady().then(createWindow);
