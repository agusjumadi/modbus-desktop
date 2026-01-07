import React, { useState } from "react";
import { modbusConnect, modbusRead } from "./api/modbus";

function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("disconnected");

  const connect = async () => {
    // const res = await modbusConnect({
    //   port: "COM3",      // Linux: /dev/ttyUSB0
    //   baudRate: 9600,
    //   slaveId: 1
    // });
    try {
      const res = await modbusConnect({
        host: "127.0.0.1", // IP PLC / device
        port: 502,           // optional (default 502)
        slaveId: 1
      });
      console.log("Connection result:", res);
      setStatus("connected");
    } catch (error) {
      console.log("Connection error:", error);
    }
    
  };

  const readData = async () => {
    const res = await modbusRead(0, 3);
    setData(res);
  };

  const disconnect = async () => {
    await window.modbus.disconnect();
    setStatus("disconnected");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Modbus RTU Desktop</h2>

      <p>Status: {status}</p>

      <button disabled={status === "connected"} onClick={connect}>Connect</button>
      <button disabled={status === "disconnected"} onClick={readData} style={{ marginLeft: 10 }}>
        Read Register
      </button>
      <button disabled={status === "disconnected"} onClick={disconnect} style={{ marginLeft: 10 }}>
        Disconnect
      </button>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
