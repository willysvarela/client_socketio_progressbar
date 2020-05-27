import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

import socketIOClient from "socket.io-client";

import { ProgressBar } from "react-rainbow-components";

const styles = {
  body: {
    background: "#1dd1a1",
    color: "#fff"
  },
  container: {
    padding: "20%",
    margin: "auto",
    textAlign: "center"
  }
};

function App() {
  const [progress, setProgress] = useState(0);
  const [progressTotal, setProgressTotal] = useState(0);
  const [responseMax, setResponseMax] = useState(null);

  const handleCallServer = () => {
    console.log("call server");
    fetch("http://localhost:4000/heavy?event=heavycall").then((res) => {
      setResponseMax(res.data);
      console.log(res);
    });
  };

  useEffect(() => {
    const socket = socketIOClient("http://localhost:4000");
    socket.on("heavycall", (data) => {
      setProgress(data.atual);
      setProgressTotal(data.total);
    });
  }, []);

  return (
    <div className="App" style={styles.body}>
      <div style={styles.container}>
        <Button variant="contained" color="primary" onClick={handleCallServer}>
          Abrir Conexão
        </Button>
        <h2>
          {progress}% (total: {progressTotal})
        </h2>
        {responseMax && <span>Cabooo: {responseMax}</span>}

        <ProgressBar value={progress} />
      </div>
    </div>
  );
}

export default App;
