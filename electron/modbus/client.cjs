const ModbusRTU = require("modbus-serial");

class ModbusClient {
  constructor() {
    this.client = new ModbusRTU();
    this.connected = false;
  }

  //async connect(port, baudRate, slaveId) {
  async connect(host, port, slaveId) {
    if (!this.connected) {
      //await this.client.connectRTUBuffered(port, { baudRate });
      await this.client.connectTCP(host, {
        port: port || 502
      });
      this.client.setID(slaveId);
      this.connected = true;
    }
  }

  async readHolding(addr, length) {
    return this.client.readHoldingRegisters(addr, length);
  }

  async close() {
    console.log("Closing Modbus connection...");
    await this.client.close();
    this.connected = false;
  }
}

module.exports = new ModbusClient();
