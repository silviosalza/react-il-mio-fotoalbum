const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController.js");
const {body, checkSchema} = require("express-validator")
const postCreate = require("../validations/postCreate.js");
const authHandler = require("../middlewares/authHandler.js");



// rotta index
router.get("/", postController.index)
//rotta show
router.get("/:id", postController.show)
//rotta store
router.post("/",/*authHandler*/ checkSchema(postCreate),postController.store)
//rotta update
router.put("/:id",/*authHandler*/ postController.update)
//rotta delete
router.delete("/:id",/*authHandler*/ postController.destroy)

module.exports = router;