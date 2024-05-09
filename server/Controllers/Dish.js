const Dish = require("../Models/Dish");
const User = require("../Models/User");

module.exports.AddDish = async (req, res, next) => {
  try {
    const { name, description, price, ingredients, imageURL, createdBy } =
      req.body;

    if (!(name || description || ingredients || imageURL || createdBy || price))
      return res.status(400).json({ message: "All fields required" });

    const creator = await User.findById(createdBy);
    if (!creator || creator.role !== "Chef")
      return res
        .status(400)
        .json({ message: "The creator is not a valid chef user" });
    const dish = await Dish.create(
      [{ name, description, price, ingredients, imageURL, createdBy }],
      { new: true }
    );

    if (!dish) return res.status(400).json({ message: "Error creating dish" });

    res.status(200).json({ message: "Dish created successfully", dish });
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.EditDish = async (req, res, next) => {
  try {
    const { id, update, value } = req.body;
    const dish = await Dish.findByIdAndUpdate(
      id,
      { [update]: value },
      { new: true }
    );
    if (!dish) return res.status(400).json({ message: "Cannot find dish" });
    res.status(200).json({ message: "Dish edited successfully", dish });
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.RemoveDish = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id)
      return res.status(400).json({ message: "The id given is not a dish" });
    const dish = await Dish.findOneAndDelete({ _id: id });
    if (!dish) 
      return res.status(400).json({ message: "Cannot find dish" });
    res.status(200).json({ message: "Dish deleted successfully", dish });
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.GetAllDishes = async (req, res, next) => {
  try{
    const dishes = await Dish.find().lean();
    res.status(200).json({ message: "Got all dishes", dishes });
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports.RateDish = async (req, res, next) =>{
  try{
    const { id, rating } = req.body
    if(!id || !rating)
      return res.status(200).json({message: "All fields required"})
    const dish = await Dish.findById(id)
    const newAverage = Math.round((dish.rating + (rating - dish.rating)/(dish.timesRated+1)) * 100) /100
    const newDish = await Dish.findByIdAndUpdate(id, { $inc:{ timesRated: 1}, rating: newAverage}, {new:true})
    if(!newDish) 
      return res.status(500).json({message: "Could not update"})
    res.status(200).json({ message: "rated dish", newDish });
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
}
