const router = require("express").Router();
const { Deposit, Withdraw, IncreaseStanding, DecreaseStanding, GetUser, DeleteUser } = require("../Controllers/User")

router.post("/Deposit", Deposit);
router.post("/Withdraw", Withdraw)
router.post("/IncreaseStanding", IncreaseStanding)
router.post("/DecreaseStanding", DecreaseStanding)
router.get("/GetUser", GetUser)
router.delete("/DeleteUser", DeleteUser)

module.exports = router;