import React, { useState, useEffect } from "react";
// import Web3 from 'web3';
import { useWeb3 } from "../web3context";

import "../styling/header.css";

const Header = () => {
  const { web3, connectToMetaMask, getConnectedAccount  } = useWeb3();

  const connectedAcc = getConnectedAccount();

  return (
    <header>
      <div className="header">
        {connectedAcc ? (
          <p className="wallet-address">{connectedAcc}</p>
        ) : (
          <button className="connect-button" onClick={connectToMetaMask}>
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
