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
const { channels, operations, datatypes } = require("../src/shared");
const { Configuration } = require("../src/shared/configuration");

const {getFormattedDatetime} = require("./electron/pyapi")

console.log(channels);
console.log(operations);
console.log(datatypes)

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


// this is for menu sub-item Add New Field
const NavigateToLink = (exports.NavigateToLink = (link) => {
  mainWindow.webContents.send(channels.NAVIGATE, link);
});

ipcMain.on(channels.CONFIGURATION, (event, method, dtype, arg)=>{
  console.log(method, dtype, arg)
  switch(method){
    case operations.CREATE:
      switch(dtype){
        case datatypes.METAINFO:
          // create metainfo
          break;
        case datatypes.FIELD:
          // create field
          break;
        case datatypes.PLOT:
          // create plot item
          break;
        default:
          // create new global store
          
      }
      break;
    case operations.READ:
      switch(dtype){
        case datatypes.METAINFO:
          console.log("I am in read metainfo")
          // get metainfo
          break;
        case datatypes.FIELD:
          // get field
          break;
        case datatypes.PLOT:
          // get plot
          break;
        default:
          event.sender.send(channels.CONFIGURATION, method, dtype, configdata.getConfigData());
      }
      break;
    case operations.UPDATE:
      switch(dtype){
        case datatypes.METAINFO:
          console.log(arg)
          configdata.setMetaInfo(arg)
          mainWindow.webContents.send(channels.REFRESH_APP, configdata.getConfigData())
          break;
        case datatypes.FIELD:
          // update field
          break;
        case datatypes.PLOT:
          // update plot
          break;
        case datatypes.OUTPUTINFO:
          // update ouputinfo and send data to app using refresh_app
          console.log('configuration update outputinfo')
          configdata.updateOutputInfo(arg)
        default:
          // update global store
      }
      break;
    case operations.DELETE:
      switch(dtype){
        case datatypes.METAINFO:
          // delete metainfo
          break;
        case datatypes.FIELD:
          mainFieldDelete(arg);
          break;
        case datatypes.PLOT:
          // delete plot
          break;
        case datatypes.OUTPUTINFO:
          console.log("configuration delete outputinfo")
          configdata.removeOutputInfo(arg)
        default:
          // make global store as null
      }
      break;
  }

})


ipcMain.on(channels.FORMAT_CONVERSION,(event, type, format)=>{
  getFormattedDatetime(format,(result)=>{
    console.log(result);
    if(type === 'file'){
      event.sender.send(channels.FORMAT_CONVERSION, type, `${result[0]}.csv`)
    }
    else{
      event.sender.send(channels.FORMAT_CONVERSION, type, result[0])
    }
    
  });
})


ipcMain.on(channels.FIELD_VALIDATION, (event, message) => {
  console.log(message);
});

function mainFieldDelete(field){

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

}

ipcMain.on(channels.OPEN_EDITDIALOG, (event, suburl, arg)=>{
  console.log("open edit dialog");
  console.log(suburl);
  console.log(arg);

  createeditDialog(suburl);
})





