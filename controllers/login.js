const { UserModel } = require("../models/Users");

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
  //   // get signature, publickey
  //   // fetch user.
  //   // create message.
  //   // verify signature
  //   // create a JWT.
  //   // return to the User.
};

module.exports = { getNonce, loginUser };
