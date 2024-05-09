const User = require("../Models/User");

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
      .status(200)
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
      .status(200)
      .json({ message: "Balance updated", success: true, user, id: user._id});
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.IncreaseStanding = async (req,res,next) =>{
  try{
    const {id, amount} = req.body
    if(!id)
      return res.status(400).json({ message: "All fields are required" });
    
    const user = await User.findById(id,{standing: true, level: true, _id: false})
    if(!user)
      return res.status(400).json({ message: "User does not exist!" });
    console.log(user)
    const newUser = {
      standing: user.standing +amount ,
      level: user.level
    }
    if(newUser.standing > 1){
      newUser.standing = 0
      if(newUser.level !== 1){
        newUser.level = newUser.level +1
      }
    }
    const updateUser = await User.findByIdAndUpdate(id, {standing: newUser.standing, level: newUser.level}, {new:true})
    if(!updateUser)
      return res.status(400).json({ message: "Issue updating user's standing and level" });

    res.status(200).json({message:"Status elevated", updateUser})
    next()

  } catch(error){
    return res
    .status(500)
    .json({message: error})
  }

}

module.exports.DecreaseStanding = async (req, res, next) =>{
  try{
    const {id, amount} = req.body
    if(!id)
      return res.status(400).json({ message: "All fields are required" });
    
    const user = await User.findById(id,{standing: true, level: true, _id: false, role: true})
    if(!user)
      return res.status(400).json({ message: "User does not exist!" });
    console.log(user)
    const newUser = {
      standing: user.standing - amount ,
      level: user.level
    }
    if(newUser.standing < -1){
      if((user.role === "Customer" && user.level === 0) || (user.role === "Chef" && user.level === -1)){
        const updateUser = await User.findByIdAndDelete(id)
        return res.status(200).json({message:"User's standing fell too low and they were deleted", updateUser})
      }
        
      newUser.standing = 0
      newUser.level -= 1
    }
    const updateUser = await User.findByIdAndUpdate(id, {standing: newUser.standing, level: newUser.level}, {new:true})
    if(!updateUser)
      return res.status(400).json({ message: "Issue updating user's standing and level" });

    res.status(200).json({message:"Status lowered", updateUser})
    next()

  } catch(error){
    return res
    .status(500)
    .json({message: error})
  }
}

module.exports.GetUser = async (req, res, next) =>{
  try {
    const {id} = req.body
    if(!id) return res.status(400).json({ message: "Id required" });
    const user = await User.findById(id, {password:false})
    if(!user) 
      return res.status(400).json({ message: "User does not exist!" });

    res.status(200).json({message:"User retrieved", user})
    next()
  }
  catch(error){
    return res
    .status(500)
    .json({message: error})
  }
}

module.exports.DeleteUser = async (req, res, next) => {
  try{
    const {id} = req.body
    if(!id) return res.status(400).json({ message: "Id required" });
    const user = await User.findByIdAndDelete(id)

    if(!user)
      return res.status(400).json({ message: "User does not exist!" });

    res.status(200).json({message:"User has been deleted", user})
    next()
  }
  catch(error){
    return res
    .status(500)
    .json({message: error})
  }
}
// to add:
// current order information (for pickup / delivery) --> user completes order and clears this
// standing: -2 -1 0 1 2 --> goes up or down if user gets compliments or complaints
// Need ingredient model
// each entry is an ingredient:
// name, description, quantity
// each time an order is made, subtract quantites from the DB. 
// Chefs can create an order of ingredients for food importers to complete, adding ingredients back into the stock 

