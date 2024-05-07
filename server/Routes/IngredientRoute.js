const router = require("express").Router();
const { AddIngredient, RemoveIngredient, GetAllIngredients } = require("../Controllers/Ingredient")

router.post("/AddIngredient", AddIngredient)
router.post("/RemoveIngredient", RemoveIngredient)
router.get("/GetAllIngredients", GetAllIngredients)


module.exports = router
