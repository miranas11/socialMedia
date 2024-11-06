const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile/:id", jwtMiddleware, userController.getUserProfile);
router.put("/profile", jwtMiddleware, userController.updateUserProfile);
router.get("/friends", jwtMiddleware, userController.getFriendsList);
router.get("/search", jwtMiddleware, userController.getUsersByUsername);
router.get("/validate", jwtMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Token is valid",
        data: null,
    });
});
module.exports = router;
