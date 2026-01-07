const { app, BrowserWindow, ipcMain } = require("electron");
const modbus = require("./modbus/client.cjs");
const path = require("path");

ipcMain.handle("modbus:connect", async (_, cfg) => {
  //await modbus.connect(cfg.port, cfg.baudRate, cfg.slaveId);
  await modbus.connect(cfg.host, cfg.port, cfg.slaveId);
  return true;
});

ipcMain.handle("modbus:read", async (_, payload) => {
  const res = await modbus.readHolding(payload.addr, payload.len);
  return res.data;
});

ipcMain.handle("modbus:disconnect", async (_) => {
  await modbus.close();
  return true;
});


function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,   // WAJIB
      nodeIntegration: false    // WAJIB
    }
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // DEV
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    // PROD
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(createWindow);