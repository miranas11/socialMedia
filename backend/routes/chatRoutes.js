const express = require("express");
const chatController = require("../controllers/chatController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

const router = express.Router();

router.post("/send", jwtMiddleware, chatController.sendMessage);
router.get("/:receiverId", jwtMiddleware, chatController.getMessages);
router.put("/:messageId/read", jwtMiddleware, chatController.markAsRead);

module.exports = router;
