const express = require("express");
const router = express.Router();
const activityLogController = require("../controllers/activityLogController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

router.get("/", jwtMiddleware, activityLogController.getUserActivityLogs);

module.exports = router;
