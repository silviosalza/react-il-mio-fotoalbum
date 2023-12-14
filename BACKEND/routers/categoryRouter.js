const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController.js");



//rotta store
router.get("/", categoryController.index)
router.post("/", categoryController.store)

module.exports = router;