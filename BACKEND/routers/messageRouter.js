const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController.js");



//rotta store
router.get("/", messageController.index)
router.post("/", messageController.store)

module.exports = router;