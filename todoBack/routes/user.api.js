const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
//1.회원가입 endpoint
router.post("/", userController.createUser);
//2.로그인 req body 사용해서 이메일, pw가져오고싶어
router.post("/login", userController.loginWithEmail);
module.exports = router;
