import React, { useEffect } from "react";
import { useWeb3 } from "../web3context";

function Activity() {
  const { getUserActivity } = useWeb3();

  useEffect(() => {
    getUserActivity();
  }, []);
  return <h1>Activity</h1>;
}

export default Activity;
