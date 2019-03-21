import { app, BrowserWindow, Menu, MenuItem } from "electron";
import * as path from "path";
import * as url from "url";

let mainWindow: Electron.BrowserWindow;

const shell = require("electron").shell;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 906,
        minWidth: 906,
        minHeight: 600,
        title: "Davo Editor",
        titleBarStyle: "hiddenInset"
    });

    const menu = Menu.buildFromTemplate([
        {
            label: "Davo Editor",
            submenu: [
                {
                    label: "About Davo Editor",
                    click() {
                        shell.openExternal("https://davo.pro");
                    }
                },
                { type: "separator" },
                {
                    label: "Show Developer Tools",
                    accelerator: "Alt+Super+I",
                    click() {
                        mainWindow.webContents.toggleDevTools();
                    }
                },
                {
                    label: "Reload",
                    accelerator: "CmdOrCtrl+R",
                    click() {
                        mainWindow.webContents.send("reload");
                    }
                },
                { type: "separator" },
                {
                    label: "Quit Davo Editor",
                    click() {
                        app.quit();
                    },
                    accelerator: "CmdOrCtrl+Q"
                }
            ]
        },
        {
            label: "File",
            submenu: [
                {
                    label: "Save",
                    accelerator: "CmdOrCtrl+S",
                    click() {
                        mainWindow.webContents.send("save");
                    }
                },
                { type: "separator" },
                {
                    label: "Close Tab/Window",
                    accelerator: "CmdOrCtrl+W",
                    click() {
                        mainWindow.webContents.send("close");
                    }
                }
            ]
        },
        {
            label: "Edit",
            submenu: [
                {
                    role: "undo"
                },
                {
                    role: "redo"
                },
                {
                    type: "separator"
                },
                {
                    role: "cut"
                },
                {
                    role: "copy"
                },
                {
                    role: "paste"
                },
                {
                    role: "pasteandmatchstyle"
                },
                {
                    role: "delete"
                },
                {
                    role: "selectall"
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu);

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "./index.html"),
            protocol: "file:",
            slashes: true
        })
    );

    // mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
