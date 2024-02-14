const { bufferToHex } = require("ethereumjs-util");
const { recoverPersonalSignature } = require("eth-sig-util");
const { UserModel } = require("../models/Users");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getNonce = async (req, res) => {
  try {
    const { publicKey } = req.query;
    // if not wallet address, return error
    if (!publicKey) {
      return res
        .status(403)
        .send({ message: "Wallet Address Can not be emppty" });
    }
    // check if wallet already exists.
    const userDetails = await UserModel.findOne({ publicKey }).lean();
    if (!userDetails) {
      // create a nonce
      const nonce = Math.floor(Math.random() * 1000000);
      // This means wallet connects for first time. create a record.
      const newUser = new UserModel({ publicKey, nonce });
      await newUser.save();
      return res.status(200).send({ success: true, message: nonce });
    }
    const changedNonce = Math.floor(Math.random() * 1000000);
    // Change Nonce and return the new user.
    await UserModel.findOneAndUpdate(
      { publicKey },
      {
        $set: { nonce: changedNonce },
      }
    );

    return res.status(200).send({ success: true, message: changedNonce });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { signature, publicKey } = req.body;
  // fetch user and nonce.
  const user = await UserModel.findOne({ publicKey }).lean();
  if (!user) {
    return res.status(404).send({ success: false, message: "No User found" });
  }
  // synthesize a message
  const message = `Nonce for one-time Login: ${user.nonce}`;
  const msgBufferHex = bufferToHex(Buffer.from(message, "utf8"));
  const address = recoverPersonalSignature({
    data: msgBufferHex,
    sig: signature,
  });
  if (address.toLowerCase() === publicKey.toLowerCase()) {
    console.log("verified the signature");
    const token = jwt.sign({ publicKey }, process.env.SECRET, { expiresIn: "1h" });
    return res.status(200).send({ success: true, message: token });
  } else {
    console.log("signature failed");
    return res.status(401).send({
      error: "Signature verification failed",
    });
  }
};

module.exports = { getNonce, loginUser };
