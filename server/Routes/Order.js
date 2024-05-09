const router = require("express").Router()
const { AddOrder, CompleteOrder, GetOpenChefOrders, GetOpenCustomerOrders } = require("../Controllers/Order")

router.post("/AddOrder", AddOrder )
router.post("/CompleteOrder", CompleteOrder)
router.post("/GetOpenChefOrders", GetOpenChefOrders)
router.post("/GetOpenCustomerOrders", GetOpenCustomerOrders)

module.exports = router;