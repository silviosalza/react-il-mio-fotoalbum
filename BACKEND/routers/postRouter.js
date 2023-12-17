const express = require("express");
const router = express.Router();
const multer = require('multer');
const postController = require("../controllers/postController.js");
const { body, checkSchema } = require("express-validator");
const postCreate = require("../validations/postCreate.js");
const authHandler = require("../middlewares/authHandler.js");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Specifica la cartella in cui salvare i file
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + ".jpg")
  }
})
  
  const upload = multer({ storage: storage });

// rotta index
router.get("/", postController.index)
//rotta show
router.get("/:id", postController.show)
//rotta store
router.post("/",/*authHandler*/upload.single('image'), checkSchema(postCreate),postController.store)
//rotta update
router.put("/:id",/*authHandler*/ postController.update)
//rotta delete
router.delete("/:id",/*authHandler*/ postController.destroy)

module.exports = router;