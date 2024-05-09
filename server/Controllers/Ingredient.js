const Ingredient = require("../Models/Ingredient")

module.exports.AddIngredient = async(req, res, next) =>{
  try{
    const {name, quantity} = req.body
    if(!name || !quantity){
      return res.json({message: "Invalid name or quantity"})
    }
    const ingredient = await Ingredient.findOneAndUpdate({name: name}, {$inc: {quantity: quantity}}, {new:true, upsert: true})
    if(!ingredient){
      return res.json({message: "Error updating ingredient"+name+ " " +quantity})
    }
    res.status(201).json({message:"Ingredient "+name+ " updated", success: true, ingredient})
    next()
  
  } catch(e){
    return res
    .status(400)
    .json({message: e})
  }
}

module.exports.RemoveIngredient = async(req, res, next) =>{
  try{
    const {name, quantity} = req.body
    if(!name || !quantity){
      return res.json({message: "Invalid name or quantity"})
    }
    const ingredient = await Ingredient.findOneAndUpdate({name: name}, {$inc: {quantity: -quantity}}, {new:true})
    if(!ingredient){
      return res.json({message: "Error updating ingredient"+name+ " " +quantity})
    }
    res.status(200).json({message:"Ingredient "+name+ " updated", success: true, ingredient})
    next()
  
  } catch(e){
    return res
    .status(400)
    .json({message: e})
  }
}

module.exports.GetAllIngredients = async(req, res, next) =>{
  try{
    const allIngredients = await Ingredient.find().lean()
    res.status(200).json({
      message:"Got all ingredients successfully",
      data: allIngredients.map((item)=>({
        name: item.name,
        quantity: item.quantity
      }))
    })
    next()
  }
  catch(e){
    return res
    .status(400)
    .json({message: e})
  }
}