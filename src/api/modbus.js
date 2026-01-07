export const modbusConnect = (cfg) => {
  return window.modbus.connect(cfg);
};

export const modbusRead = (addr, len) => {
  return window.modbus.read(addr, len);
};
