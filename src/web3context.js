import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";

const Web3Context = createContext();

// dependency injection module
export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [currentAccount, setCurrentAccount] = useState('');

  const connectToMetaMask = async () => {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a new Web3 instance
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.getAccounts();
      setCurrentAccount(accounts[0] || 'Not connected');
      // Add an event listener to update the context when the user switches accounts
      window.ethereum.on("accountsChanged", (accounts) => {
        setCurrentAccount(accounts[0] || 'Not connected');
        setWeb3(new Web3(window.ethereum));
      });
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      connectToMetaMask();
    } else {
      console.error("MetaMask not detected!");
    }
  }, []);

  const getConnectedAccount = () => currentAccount;

  return (
    <Web3Context.Provider value={{ web3, connectToMetaMask, getConnectedAccount }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const { web3, connectToMetaMask, getConnectedAccount  } = useContext(Web3Context);
  if (!web3) {
    console.error("Web3Context not found!");
  }
  return { web3, connectToMetaMask, getConnectedAccount  };
};
