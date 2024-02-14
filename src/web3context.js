import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";

const Web3Context = createContext();

// dependency injection module
export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [userActivity, setUserActivity] = useState([]);

  const fetchNonce = async (publicKey) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/nonce?publicKey=${publicKey}` // TODO: use baseurl
      );
      console.log(response.data);
      const nonce = response.data.message;
      return nonce;
    } catch (error) {
      console.error("Error fetching nonce:", error);
    }
  };

  const fetchToken = async (signature, publicKey) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/login`, // TODO: use baseurl
        { signature, publicKey }
      );
      console.log(response.data);

      return response.data.message;
    } catch (err) {
      console.log("error fetching login tokens");
    }
  };

  const fetchActivity = async (authToken) => {
    try {
      console.log("inside fetching activiti");
      console.log(authToken);

      const baseUrl = "http://localhost:3001";
      const response = await axios.get(`${baseUrl}/activity`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response.data);
      return response.data.message;
    } catch (err) {
      console.log("error fetching user activity");
    }
  };

  const signMessage = async (web3Instance, nonce) => {
    try {
      // Sign the message using personal_sign
      const msg = `Nonce for one-time Login: ${nonce}`;
      //   const msg = web3Instance.utils.utf8ToHex(`Nonce for one-time Login: ${nonce}`);
      // todo: use eip712 typed signatures
      const accounts = await web3Instance.eth.getAccounts();
      const signedMessage = await web3Instance.eth.personal.sign(
        msg,
        accounts[0],
        ""
      );
      return signedMessage;
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  const connectToMetaMask = async () => {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a new Web3 instance
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.getAccounts();
      setCurrentAccount(accounts[0] || "Not connected");
      // Fetch nonce from the backend.
      const nonce = await fetchNonce(accounts[0]);
      // Prompt Message with meta mask
      const sig = await signMessage(web3Instance, nonce);
      console.log(sig);
      // call api to login and get JWT
      const token = await fetchToken(sig, accounts[0]);
      setAuthToken(token);
      // Add an event listener to update the context when the user switches accounts
      window.ethereum.on("accountsChanged", (accounts) => {
        setCurrentAccount(accounts[0] || "Not connected");
        setWeb3(new Web3(window.ethereum));
      });
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const getUserActivity = async () => {
    try {
      // fetchi api
      const activity = await fetchActivity(authToken);
      console.log(activity);
      setUserActivity(activity)
    } catch (err) {
      console.log("error fetching user activity", err);
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
    <Web3Context.Provider
      value={{
        web3,
        connectToMetaMask,
        getConnectedAccount,
        authToken,
        getUserActivity,
        userActivity
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const {
    web3,
    connectToMetaMask,
    getConnectedAccount,
    authToken,
    getUserActivity,
    userActivity
  } = useContext(Web3Context);
  if (!web3) {
    console.error("Web3Context not found!");
  }
  return {
    web3,
    connectToMetaMask,
    getConnectedAccount,
    authToken,
    getUserActivity,
    userActivity
  };
};
