import React, { useState } from "react";
import "./App.css";
import Activity from "./components/activity";
import Mint from "./components/mint";
import Token from "./components/token";
import Header from "./components/header";

import { Web3Provider } from './web3context';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="app_container">
      <Web3Provider>
      <Header />
      <main>
        <div>
          <ul className="list">
            <li
              className={activeTab === 0 ? "active" : ""}
              onClick={() => setActiveTab(0)}
            >
              Mint
            </li>
            <li
              className={activeTab === 1 ? "active" : ""}
              onClick={() => setActiveTab(1)}
            >
              Token
            </li>
            <li
              className={activeTab === 2 ? "active" : ""}
              onClick={() => setActiveTab(2)}
            >
              Activity
            </li>
          </ul>
        </div>
        {activeTab === 0 && <Mint />}
        {activeTab === 1 && <Token />}
        {activeTab === 2 && <Activity />}
      </main>
      </Web3Provider>
    </div>
  );
}

export default App;
