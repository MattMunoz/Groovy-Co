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
// to add:
// current order information (for pickup / delivery) --> user completes order and clears this
// standing: -2 -1 0 1 2 --> goes up or down if user gets compliments or complaints
// Need ingredient model
// each entry is an ingredient:
// name, description, quantity
// each time an order is made, subtract quantites from the DB. 
// Chefs can create an order of ingredients for food importers to complete, adding ingredients back into the stock 

