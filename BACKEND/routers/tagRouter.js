const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tagController.js");



//rotta store
router.get("/", tagController.index)
router.post("/", tagController.store)

module.exports = router;