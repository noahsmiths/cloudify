const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const GoogleDriveUploader = require('./services/google_drive/GoogleDriveUploader');

//console.log(process.argv);
let win;

function createWindow() {
  // Create the browser window.
  if ((isDev && process.argv.length > 2) || (!isDev && process.argv.length > 1)) { //Launched with file argument
    let additionalArgs = ["file-passed"];
    isDev ? additionalArgs.push(path.normalize(process.argv[2])) : additionalArgs.push(path.normalize(process.argv[1]));
    win = new BrowserWindow({
      width: 500,
      //height: 250,
      height: 250,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        additionalArguments: additionalArgs
      },
      autoHideMenuBar: true
    });
  } else { //Launched normally
    win = new BrowserWindow({
      width: 500,
      //height: 250,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
      autoHideMenuBar: true
    });
  }

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

ipcMain.on('close', () => {
  app.quit();
});

ipcMain.on('upload-google', async (event, data) => {
  try {
    let googleDriveUploader = new GoogleDriveUploader(data.tokens, data.credentials)
    await googleDriveUploader.login();
    let link = await googleDriveUploader.uploadAndGetLink(data.file);
    event.reply('uploaded-google', link);
  } catch (err) {
    console.log(err);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
