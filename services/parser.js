const { Web3 } = require("web3");
const { TokenModel } = require("../models/Tokens");
require("dotenv").config();
const { ActivityModel } = require("../models/Activity");

const connectAndSubscribe = async () => {
  // create web3 Instance.
  const web3 = new Web3(
    `wss://sepolia.infura.io/ws/v3/${process.env.INFURA_KEY}`
  );
  const block = await web3.eth.getBlockNumber();
  console.log(block);
  // get the list of Tokens from the mongodb.
  const tokensList = await TokenModel.find().lean();
  console.log(tokensList);
  var options = {
    reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 5,
      onTimeout: false,
    },
    address: [tokensList[0].tokenAddress], // TODO: Map to all
    topics: [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", // use web3
    ],
  };
  const subscription = await web3.eth.subscribe("logs", options);

  subscription.on("data", async (log) => {
    console.log("Log data:", log);
    // save a new activity
    const decodedData = web3.eth.abi.decodeLog(
      [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      log.data,
      log.topics.slice(1)
    );

    // Extract relevant information
    const to = decodedData["to"]; // Use the correct field name based on your contract
    const from = decodedData["from"]; // Use the correct field name based on your contract
    const amount = decodedData["value"];
    console.log(to, from, amount);
    const activityObj = new ActivityModel({
      to,
      from,
      amount: web3.utils.fromWei(amount, "ether"),
      tokenAddress: log.address,
      tx: log.transactionHash,
    });
    console.log(activityObj);
    await activityObj.save();
    // Handle the log data here
  });

  subscription.on("error", (error) => {
    console.error("Subscription error:", error);
  });
};

module.exports = { connectAndSubscribe };
