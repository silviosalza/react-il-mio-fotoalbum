const {Router} = require("express")
const router = Router()
const authController = require("../controllers/authController")
const { checkSchema } = require("express-validator")
const userRegister = require("../validations/userRegistrator")
const userLogin = require("../validations/userLogin")

router.post ("/register", checkSchema(userRegister), authController.register)
router.post ("/login",checkSchema(userLogin), authController.login)
// router.post ("/password-reset", auth.password_reset)


module.exports = router