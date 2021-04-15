const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logOut);
router.post("/addToFavorite/:id", userController.addToFavorite);
router.post("/removeFromFavorite/:id", userController.removeFromFavorite);
router.get("/getFavoriteCitiesWeatherData/:id", userController.getFavoriteCitiesWeatherData);

module.exports = router;
