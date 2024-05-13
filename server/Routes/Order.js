const router = require("express").Router()
const { AddOrder, CompleteOrder, GetOpenChefOrders, GetOpenCustomerOrders, FulfillOrder, GetUserOrders } = require("../Controllers/Order")

router.post("/AddOrder", AddOrder )
router.post("/CompleteOrder", CompleteOrder)
router.get("/GetOpenChefOrders", GetOpenChefOrders)
router.get("/GetOpenCustomerOrders", GetOpenCustomerOrders)
router.post("/FulfillOrder", FulfillOrder)
router.post("/GetUserOrders", GetUserOrders)

module.exports = router;