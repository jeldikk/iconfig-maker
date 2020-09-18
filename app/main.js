const {app, BrowserWindow, Menu, remote, ipcMain} = require("electron");

const url = require('url');
const path = require('path');
const { add } = require("lodash");
// const { start } = require("repl");

const {MenuTemplate} = require("./electron/menu_template");
const { start } = require("repl");
const { channels } = require("../src/shared");

let mainWindow = null;
let addFieldDialog = null;


let configdata = null;


const startURL = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname,"../index.html"),
    protocol: 'file:',
    slashes: true
});

const createWindow = ()=>{

    mainWindow = new BrowserWindow({
        resizable: process.env.NODE_ENV ? true : false,
        webPreferences:{
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        show: false,
    })

    mainWindow.webContents.on('dom-ready',()=>{
        mainWindow.webContents.openDevTools();
        mainWindow.show();
    })
    
    // mainWindow.on('did-finish-load',()=>{
    //     console.log("did-finish-load event called")
    // })

    
    mainWindow.setTitle("iconfig-maker")
    mainWindow.loadURL(startURL);

    mainWindow.on('closed',()=>{
        mainWindow = null;
    })
}

const createAddFieldDialog = exports.createAddFieldDialog  = ()=>{

    addFieldDialog = new BrowserWindow({
        parent: mainWindow,
        height: 500,
        modal: true,
        webPreferences:{
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        show: false
    });

    // console.log(startURL+'/addField');
    addFieldDialog.loadURL(startURL+"/add-field-config");

    process.env.NODE_ENV === 'dev' ? addFieldDialog.webContents.openDevTools() : ''

    addFieldDialog.on('closed',()=>{
        console.log("addfielddialog closed")
        addFieldDialog = null;
    })

    addFieldDialog.webContents.on('dom-ready',()=>{
        addFieldDialog.show();
    })

    addFieldDialog.on('hide',()=>{
        console.log("hide event called on addFieldDialog")
        // console.log(addFieldDialog);
    })

    addFieldDialog.setTitle("Add Field specifications")
    addFieldDialog.removeMenu();
}

// app.on('ready',()=>{
//     createWindow();

//     Menu.setApplicationMenu(MenuTemplate);
// });

app.whenReady().then(()=>{
    createWindow();
    Menu.setApplicationMenu(MenuTemplate);
})


app.on('window-all-closed',()=>{
    app.quit();
})


const NavigateToLink = exports.NavigateToLink = (link)=>{

    mainWindow.webContents.send(channels.NAVIGATE_TO, link);
}

ipcMain.on(channels.FIELD_VALIDATION,(event, message)=>{
    console.log(message);
})

// ipcMain.on(channels.SET_STATUSBAR,(event, message)=>{
//     // console.log("ipcMain.on set_statusbar")
//     mainWindow.webContents.send(channels.SET_STATUSBAR, message);
// })