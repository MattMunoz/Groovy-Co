const Dish = require("../Models/Dish");
const User = require("../Models/User");
const Ingredient = require("../Models/Ingredient");

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

		const stock = await Ingredient.find(
			{},
			{ name: true, quantity: true },
		).lean();
		let soldOut = false;
		for (const item of ingredients) {
			const ing = stock.find((ing) => ing.name === item.name);
			if (!ing || (ing && ing.quantity < item.quantity)) {
				soldOut = true;
				break;
			}
		}

		const dish = await Dish.create(
			[{ name, description, price, ingredients, imageURL, createdBy, soldOut }],
			{ new: true },
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
		if (update === "ingredients") {
			const stock = await Ingredient.find(
				{},
				{ name: true, quantity: true },
			).lean();
			let soldOut = false;
			for (const item of value) {
				const ing = stock.find((ing) => ing.name === item.name);
				if (!ing || (ing && ing.quantity < item.quantity)) {
					soldOut = true;
					break;
				}
			}
			const dish = await Dish.findByIdAndUpdate(
				id,
				{ [update]: value, soldOut },
				{ new: true },
			);
			if (!dish) 
				return res.status(400).json({ message: "Cannot find dish" });
			res
				.status(200)
				.json({
					message: "Dish edited successfully, sold out status changed",
					dish,
				});
			next();
		} else {
			const dish = await Dish.findByIdAndUpdate(
				id,
				{ [update]: value },
				{ new: true },
			);
			if (!dish) return res.status(400).json({ message: "Cannot find dish" });
			res.status(200).json({ message: "Dish edited successfully", dish });
			next();
		}
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
		if (!dish) return res.status(400).json({ message: "Cannot find dish" });
		res.status(200).json({ message: "Dish deleted successfully", dish });
		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.GetAllDishes = async (req, res, next) => {
	try {
		const dishes = await Dish.find().lean();
		res.status(200).json({ message: "Got all dishes", dishes });
		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.RateDish = async (req, res, next) => {
	try {
		const { id, rating } = req.body;
		if (!id || !rating)
			return res.status(200).json({ message: "All fields required" });
		const dish = await Dish.findById(id);
		const newAverage =
			Math.round(
				(dish.rating + (rating - dish.rating) / (dish.timesRated + 1)) * 100,
			) / 100;
		const newDish = await Dish.findByIdAndUpdate(
			id,
			{ $inc: { timesRated: 1 }, rating: newAverage },
			{ new: true },
		);
		if (!newDish) return res.status(500).json({ message: "Could not update" });
		res.status(200).json({ message: "rated dish", newDish });
		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.UpdateSoldOut = async (req, res, next) => {
	try {
		const ingredients = await Ingredient.find(
			{},
			{ name: true, quantity: true, _id: false },
		).lean();
		const dishes = await Dish.find(
			{},
			{ name: true, ingredients: true, soldOut: true, _id: false },
		).lean();

		const newDishes = dishes.map((dish) => {
			let out = false;
			dish.ingredients.map((ingredient) => {
				const compare = ingredients.find(
					(item) => item.name === ingredient.name,
				);
				if (!compare || (compare && compare.quantity < ingredient.quantity))
					out = true;

				if (out) return;
			});
			if (out) return { ...dish, soldOut: true };
			return { ...dish, soldOut: false };
		});

		const dishUpdate = [];
		for (let i = 0; i < newDishes.length; i++) {
			if (
				newDishes[i].name === dishes[i].name &&
				newDishes[i].soldOut !== dishes[i].soldOut
			)
				dishUpdate.push(newDishes[i]);
		}
		if (dishUpdate.length === 0)
			return res.status(200).json({ message: "All dishes are up to date" });
		for (const dish of dishUpdate) {
			await Dish.findOneAndUpdate(
				{ name: dish.name },
				{ soldOut: dish.soldOut },
			);
		}
		res
			.status(200)
			.json({ message: "Updated sold out status of all dishes", dishUpdate });
		next();
	} catch (error) {
		console.log(error);
		res.status(500).json({ error });
	}
};
