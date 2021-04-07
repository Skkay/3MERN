const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logOut);

module.exports = router;
