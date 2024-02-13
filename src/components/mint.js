import React, { useState } from "react";
import { useWeb3 } from "../web3context";
import CustomERC20Abi from "../abi/CustomERC20.json";

import "../styling/mint.css";

function Mint() {
  const { web3, getConnectedAccount } = useWeb3();
  const [tokenAmount, setTokenAmount] = useState("");

  const handleMint = async () => {
    try {
      // todo: handle mint of new tokens
      const account = getConnectedAccount();
      // create instance to the deployed contract.
      // todo: the contract address should be configurable
      const contract = new web3.eth.Contract(
        CustomERC20Abi,
        "0x09ECa92a84e4EE0533039C2D5fdC49106CE08789"
      );
      // Note: suppossing the token uses 10^18 displacements
      const mintAmountInWei = web3.utils.toWei(tokenAmount.toString(), "ether");
      // trigger mint function
      const result = await contract.methods
        .mint(account, mintAmountInWei)
        .send({ from: account });
      console.log(result);
    } catch (err) {
      console.log("rejected or error with transaction");
    }
  };

  return (
    <div className="mint_container">
      <input
        placeholder="Enter tokens"
        type="number"
        value={tokenAmount}
        onChange={(e) => {
          setTokenAmount(e.target.value);
        }}
      />
      <button onClick={handleMint}>Mint CustomERC20 Tokens</button>
    </div>
  );
}

export default Mint;
