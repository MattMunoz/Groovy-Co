const router = require("express").Router();
const { Deposit, Withdraw } = require("../Controllers/user")

router.post("/Deposit", Deposit);
router.post("/Withdraw", Withdraw)

module.exports = router;