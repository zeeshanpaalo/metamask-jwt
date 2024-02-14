import React, { useState } from "react";
import { useWeb3 } from "../web3context";
import CustomERC20Abi from "../abi/CustomERC20.json";

import "../styling/mint.css";

function Mint() {
  const { web3, getConnectedAccount } = useWeb3();
  const [tokenAmount, setTokenAmount] = useState(0);

  const [selectedToken, setSelectedToken] = useState("");

  const handleTokenChange = (event) => {
    const selectedToken = event.target.value;
    setSelectedToken(selectedToken);
  };

  const handleMint = async () => {
    try {
      // todo: handle mint of new tokens
      const account = getConnectedAccount();
      // create instance to the deployed contract.
      // todo: the contract address should be configurable
      const contract = new web3.eth.Contract(CustomERC20Abi, selectedToken);
      // Note: suppossing the token uses 10^18 displacements
      const mintAmountInWei = web3.utils.toWei(tokenAmount.toString(), "ether");
      // trigger mint function
      const result = await contract.methods
        .mint(mintAmountInWei)
        .send({ from: account });
      console.log(result);
    } catch (err) {
      console.log("rejected or error with transaction");
    }
  };

  return (
    <div className="mint_container">
      <label htmlFor="tokenSelect">Select ERC-20 Token:</label>
      <select
        id="tokenSelect"
        onChange={handleTokenChange}
        value={selectedToken}
      >
        <option value="" disabled>
          Select a token
        </option>
        {["0x09ECa92a84e4EE0533039C2D5fdC49106CE08789"].map((address) => (
          <option key={address} value={address}>
            {address}
          </option>
        ))}
      </select>
      <input
        placeholder="Enter tokens"
        type="number"
        value={tokenAmount}
        onChange={(e) => {
          setTokenAmount(e.target.value);
        }}
      />
      <button onClick={handleMint}>Buy Tokens</button>
    </div>
  );
}

export default Mint;
