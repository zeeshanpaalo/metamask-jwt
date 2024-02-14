import React, { useEffect } from "react";
import { useWeb3 } from "../web3context";

function Activity() {
  const { userActivity, getUserActivity } = useWeb3();

  useEffect(() => {
    getUserActivity();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>To</th>
            <th>From</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {userActivity.map((item, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{item.to}</td>
              <td>{item.from}</td>
              <td>{item.tokenAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activity;
