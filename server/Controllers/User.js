const User = require("../Models/UserModel");

module.exports.Deposit = async (req, res, next) => {
  try {
    const { id, amount } = req.body;
    if (!id || !amount) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOneAndUpdate({_id: id}, {$inc: {balance: amount}}, {new: true})
    if (!user) {
      return res.json({ message: "User doesn't exist" });
    }
    res
      .status(201)
      .json({ message: "Balance updated", success: true, user, id: user._id});
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Withdraw = async (req, res, next) => {
  try {
    const { id, amount } = req.body;
    if (!id || !amount) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOneAndUpdate({_id: id}, {$inc: {balance: -amount}}, {new: true})
    if (!user) {
      return res.json({ message: "User doesn't exist" });
    }
    res
      .status(201)
      .json({ message: "Balance updated", success: true, user, id: user._id});
    next();
  } catch (error) {
    console.error(error);
  }
};

