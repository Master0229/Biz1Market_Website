const { app, BrowserWindow, Menu, webFrame, Notification } = require('electron')
const url = require("url");
const path = require("path");
const electron = require('electron');
const { PosPrinter } = require("electron-pos-printer");
const database = require('./database')
const find = require('local-devices');
const ip = require('ip');

let mainWindow
let menu = Menu;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          click() { redirect(); }
        },
        { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() { require('electron').shell.openExternal('https://www.slickpos.com/') }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })

    // Edit menu
    template[1].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' }
        ]
      }
    )

    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ]
  }

  menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})


//////////////////////////////////////PRINT/////////////////////////////////////////////////////////////
global.GetPrinters = function () {
  return mainWindow.webContents.getPrinters()
}
global.scanlan = function () {
  return find();
}
global.startserver = function (){
  return database.startserver();
}
global.database = function (){
  return database.app
}
global.removeclient = function (id){
  return database.removeclient(id)
}
global.stopserver = function (){
  return database.stopserver()
}
global.Print = function (template, printer) {
  console.log(printer);
  const options = {
    preview: false,                                 // Preview in window or print
    width: '300px',                                 //  width of content body
    margin: '0 0 0 0',                              // margin of content body
    copies: 1,                                      // Number of copies to print
    printerName: printer,         // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true
  }

  const data = [
    {
      type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image'
      value: `${template}`,
      style: ``,
      css: {}
    }
  ]

  PosPrinter.print(data, options)
    .then(() => { })
    .catch((error) => {
      console.error(error);
    });
}
function redirect() {
  mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
}