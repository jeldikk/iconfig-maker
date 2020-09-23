const {
  app,
  BrowserWindow,
  Menu,
  remote,
  ipcMain,
  dialog,
} = require("electron");

const url = require("url");
const path = require("path");

const { MenuTemplate } = require("./electron/menu_template");
const { channels } = require("../src/shared");
const { Configuration } = require("../src/shared/configuration");

// console.log(channels);

let mainWindow = null;
let editDialog = null;

let configdata = Configuration.create();
// console.log(configdata.getMetaInfo())

const startURL =
  process.env.ELECTRON_START_URL ||
  url.format({
    pathname: path.join(__dirname, "../index.html"),
    protocol: "file:",
    slashes: true,
  });

const createWindow = () => {
  mainWindow = new BrowserWindow({
    resizable: process.env.NODE_ENV ? true : false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      defaultFontSize: 14,
    },
    show: false,
  });

  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.webContents.openDevTools();
    mainWindow.show();
  });

  // mainWindow.on('did-finish-load',()=>{
  //     console.log("did-finish-load event called")
  // })

  mainWindow.setTitle("iconfig-maker");
  mainWindow.loadURL(startURL);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

const createeditDialog = exports.createeditDialog = ((suburl) => {
  editDialog = new BrowserWindow({
    parent: mainWindow,
    height: 500,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    show: false,
  });

  // console.log(startURL+'/addField');
  editDialog.loadURL(startURL + suburl);

  process.env.NODE_ENV === "dev"
    ? editDialog.webContents.openDevTools()
    : "";

  editDialog.on("closed", () => {
    console.log("addfielddialog closed");
    editDialog = null;
  });

  editDialog.webContents.on("dom-ready", () => {
    editDialog.show();
  });

  editDialog.on("hide", () => {
    console.log("hide event called on addFieldDialog");
    // console.log(addFieldDialog);
  });

  editDialog.setTitle("Add Field specifications");
  editDialog.removeMenu();
});


app.whenReady().then(() => {
  // configdata = Configuration.create();
  createWindow();
  Menu.setApplicationMenu(MenuTemplate);
});

app.on("window-all-closed", () => {
  configdata = null;
  app.quit();
});

const NavigateToLink = (exports.NavigateToLink = (link) => {
  mainWindow.webContents.send(channels.NAVIGATE_TO, link);
});

ipcMain.on(channels.FIELD_VALIDATION, (event, message) => {
  console.log(message);
});

ipcMain.on(channels.GET_CONFIGDATA, (event, message) => {
  console.log("get configdata from main.js");
  // console.log(event);
  // console.log(configdata.getConfigData())
  console.log(message);
  event.sender.send(channels.GET_CONFIGDATA, configdata.getConfigData());
});

ipcMain.on(channels.GET_METAINFO, (event) => {
  console.log("get_metainfo");
});

ipcMain.on(channels.GET_FIELDLIST, (event) => {
  console.log("get_fieldlist");
});

ipcMain.on(channels.GET_FIELDINFO, (event) => {
  console.log("get field_info");
});

ipcMain.on(channels.GET_OUTPUTINFO, (event) => {
  console.log("get outputinfo");
});

ipcMain.on(channels.RESET_CONFIG, (event, type) => {
  configdata = Configuration.create();
});



ipcMain.on(channels.DEL_FIELD, (event, field) => {
  let confirmed = dialog.showMessageBoxSync(mainWindow, {
    type: "warning",
    title: "confirm to delete field",
    message: `Do you really want to delete - '${field.name}'`,
    buttons: ["Cancel", "Confirm"],
    defaultId: 0,
    cancelId: 0,
  });

  if(confirmed){
    configdata.removeField(field);
    mainWindow.webContents.send(channels.REFRESH_APP, configdata.getConfigData())
  }

});

ipcMain.on(channels.EDIT_FIELD,(event, field)=>{

})


ipcMain.on(channels.ADD_FIELD, (event)=>{

})


ipcMain.on(channels.EDIT_METAINFO, (event, meta_info)=>{

  console.log("edit metainfo event released")
  
})

ipcMain.on(channels.ADD_METAINFO, (event)=>{

})

ipcMain.on(channels.OPEN_EDITDIALOG, (event, suburl, arg)=>{
  console.log("open edit dialog");
  console.log(suburl);
  console.log(arg);

  createeditDialog(suburl);
})





