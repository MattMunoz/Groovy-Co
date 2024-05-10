const router = require("express").Router();
const { AddDish, EditDish, RemoveDish, GetAllDishes, RateDish, UpdateSoldOut } = require("../Controllers/Dish")

router.post("/AddDish", AddDish)
router.post("/RemoveDish", RemoveDish)
router.post("/EditDish", EditDish)
router.get("/GetAllDishes", GetAllDishes)
router.post("/RateDish", RateDish)
router.post("/UpdateSoldOut", UpdateSoldOut)

module.exports = router