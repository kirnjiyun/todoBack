const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
//1.회원가입 endpoint
router.post("/", userController.createUser);
//2.로그인 req body 사용해서 이메일, pw가져오고싶어
router.post("/login", userController.loginWithEmail);
//토큰을 통해 유저 아이디를 빼내고 그 아이디로 유저 객체를 찾아서 보내주기
router.get("/me", authController.authenticate, userController.getUser);
module.exports = router;
