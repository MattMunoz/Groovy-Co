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
			{ complete: true, fulfilled:true },
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
		const orders = await Order.find({ type: "Chef", fulfilled: false }).lean();
		res.status(200).json({ message: "Got all open chef orders", orders });
		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.GetOpenCustomerOrders = async (req, res, next) => {
	try {
		const orders = await Order.find({ type: "Customer", fulfilled: false }).lean();
		res.status(200).json({ message: "Got all open customer orders", orders });
		next();
	} catch (error) {
		res.status(500).json({ error });
	}
};

module.exports.FulfillOrder = async(req,res,next)=> {
	try{
		const {orderId, id, role} = req.body
		if(!orderId || !role) return res.status(400).json({ message: "Need order id and user role" });
		if(role !== "Importer" && role !== "Chef") return res.status(400).json({ message: "given role is not an importer or chef" });
		const result = await Order.findByIdAndUpdate(orderId, {fulfilled:true, fulfilledBy: id}, {new:true})
		if(!result)
			return res.status(400).json({ message: "Order id does not exist!" });
		res.status(200).json({ message: "Order Successfully fulfilled", result });
		next();
	}
	catch (error) {
		res.status(500).json({ error });
	}
}

module.exports.GetUserOrders = async(req,res,next) =>{
	try{
		const {id} = req.body
		if (!id) {
			return res.status(400).json({ message: "Need user id", id });
		}

		const orders = await Order.find({orderer: id, complete:false, fulfilled:true},{}, {new:true})
		res.status(200).json({ message: "Got all users fulfilled open orders", orders });
		next();
	}
	catch (error) {
		res.status(500).json({ error });
	}
}
/*
	When an order is made by a customer:
		1. the user needs to decide if its a pickup, delivery, or reservation
		2. if pickup or reservation, when they press order (and have selected reservation time)
			a. They will be prompted to rate each dish that they ordered (only once if multiple quantity)
				(this will have to be frontend as the dish ids are not saved in the order collection)
			b. Maybe when they rate a dish, if it is a 1 then the chef gets a complaint filed aganist them and vice versa
		3. if it is delivery
			a. the order is added to the order collection as an open order
			b. then, a deliverer needs to log in and complete that order
			c. after the order is marked "delivered", then the customer can rate each delivered dish and choose 
				to compliment/complain the deliverer
			d. the order is then marked complete
		4. Whenever an order is completed, the total ingredients of that order are subtracted from the ingredients collection
		5. Any dish that requires more ingredients then we have is marked as sold out

	When an order is made by a chef:
		1. It is added to the order collection
		2. an importer needs to sign in and view their orders, then they can deliver the order
		3. once the order is delivered, a chef needs to sign in to recieve it and complain/ compliment the importer
		4. once the order is accepted and marked complete, the ingredients are added to the inventory
		5. A check is done here to mark sold out dishes as in stock if neccessary ingredients are added
		
*/