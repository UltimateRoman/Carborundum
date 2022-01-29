import React, { useState, useEffect } from 'react';
import {
  loadWeb3,
  loadBlockchainData,
  connectAccount,
  getMemberList,
  getMemberScore
} from "./utils/web3utils.js";
import './App.css';

function App() {
  const [isConnected, setConnected] = useState(false);
  const [account, setAccount] = useState("Not Connected");
  const [myScore, setScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const connected = await loadWeb3();
      if(connected) {
        const loaded = await loadBlockchainData();
        if(loaded) {
          const acc = await connectAccount();
          setAccount(acc);   
          setConnected(true);
          const score = await getMemberScore(acc);
          setScore(score);
        }
      }
    }
    fetchData();
  },[isConnected]);

  if (isConnected) {
    return(
      <div>
        <center>
          <p style={{fontSize: 30}}>{account}</p>
          <h3>Trees contributed: {myScore.toString()}</h3>
        </center>
      </div>
    );
  } else {
    return(
      <div>
        <center>
          <p style={{fontSize: 30}}>Unsupported browser, use a web3 wallet</p>
        </center>
      </div>
    );
  }
}

export default App;
