const { Signup, Login } = require("../Controllers/Auth");
const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/checkout", userVerification);

module.exports = router;
