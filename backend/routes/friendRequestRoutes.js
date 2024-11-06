const express = require("express");
const router = express.Router();
const friendRequestController = require("../controllers/friendRequestController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

router.post("/send", jwtMiddleware, friendRequestController.sendFriendRequest);
router.put(
    "/:id/accept",
    jwtMiddleware,
    friendRequestController.acceptFriendRequest
);
router.put(
    "/:id/reject",
    jwtMiddleware,
    friendRequestController.rejectFriendRequest
);
router.get("/", jwtMiddleware, friendRequestController.getFriendRequests);

module.exports = router;
