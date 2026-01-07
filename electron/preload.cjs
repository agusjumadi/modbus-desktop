const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("modbus", {
  connect: (cfg) => ipcRenderer.invoke("modbus:connect", cfg),
  disconnect: () => ipcRenderer.invoke("modbus:disconnect"),
  read: (addr, len) =>
    ipcRenderer.invoke("modbus:read", { addr, len }),
});
