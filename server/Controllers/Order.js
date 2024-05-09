const Order = require("../Models/Order");
const User = require("../Models/User");

module.exports.AddOrder = async (req, res, next) => {
	try {
		const { orderer, items } = req.body;
		if (!orderer || !items) {
			return res.status(400).json({ message: "Need orderer, type, and items" });
		}
		const user = await User.findById(orderer);
		if (!user) {
			return res.status(400).json({ message: "Orderer id does not exist" });
		}

		const order = await Order.create(
			[{ orderer: orderer, type: user.role, items: items }],
			{ required: true },
		);

		if (!order) {
			return res.status(500).json({ message: "Error creating order" });
		}
		res.status(201).json({ message: "Order Successfully created", order });
		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.CompleteOrder = async (req, res, next) => {
	try {
		const { id } = req.body;
		if (!id) {
			return res.status(400).json({ message: "Need order id" });
		}

		const order = await Order.findByIdAndUpdate(
			id,
			{ complete: true },
			{ new: true },
		);
		if (!order)
			return res.status(400).json({ message: "Order id does not exist!" });
		res.status(200).json({ message: "Order Successfully closed", order });
		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.GetOpenChefOrders = async (req, res, next) => {
	try {
		const orders = await Order.find({ type: "Chef", complete: false }).lean();
		res.status(200).json({ message: "Got all open chef orders", orders });
		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.GetOpenCustomerOrders = async (req, res, next) => {
	try {
		const orders = await Order.find({ type: "Customer", complete: false }).lean();
		res.status(200).json({ message: "Got all open customer orders", orders });
		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};
