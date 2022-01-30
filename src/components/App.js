import React, { useState, useEffect } from 'react';
import {
  loadWeb3,
  loadBlockchainData,
  connectAccount,
  getMemberScore
} from './utils/web3utils.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './Main.js';
import Navbar from './Navbar.js';
import Leaderboard from './Leaderboard.js';
import './App.css';

function App() {
  const [isConnected, setConnected] = useState(false);
  const [account, setAccount] = useState("Not Connected");
  const [myScore, setScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const connected = await loadWeb3();
      if (connected) {
        const loaded = await loadBlockchainData();
        if (loaded) {
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
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={
            <Main 
              account={account} 
              myScore={myScore}
            />
          } /> 
      
          <Route path="leaderboard" element={
            <Leaderboard />
          } />        
        </Routes>
      </BrowserRouter>
    );
  } else {
    return(
      <div>
        <center>
          <p style={{fontSize: 20}}>Unsupported browser, use a web3 wallet</p>
        </center>
      </div>
    );
  }
}

export default App;
