const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

// 회원가입 엔드포인트
router.post("/", userController.createUser);

// 로그인 엔드포인트
router.post("/login", userController.loginWithEmail);

// 토큰을 통해 유저 아이디를 빼내고 그 아이디로 유저 객체를 찾아서 보내주기
router.get("/me", authController.authenticate, userController.getUser);

// 로그아웃 엔드포인트
router.post("/logout", authController.authenticate, userController.logout);

module.exports = router;
