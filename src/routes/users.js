const express = require("express");


const tokenGen = require("../auth/tokenGenerator");
const { USER_CONTROLLER } = require("../controller");
const bodyValidator = require("../middleware/joiBodyValidator");
const {signupValidator,loginValidator } = require("../validation/user");
const { signIn, singUp } = USER_CONTROLLER;

const router = express.Router();

// :::::::::::: Create User ::::::::::

router.post("/signup", bodyValidator(signupValidator), singUp);
router.post("/login", bodyValidator(loginValidator), tokenGen, signIn);

module.exports = router;
