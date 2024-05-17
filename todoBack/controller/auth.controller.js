const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.authenticate = (req, res, next) => {
    const tokenString = req.headers.authorization;
    if (!tokenString) {
        return res
            .status(401)
            .json({ status: "fail", message: "No token provided" });
    }
    if (!tokenString.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ status: "fail", message: "Invalid token format" });
    }

    const token = tokenString.replace("Bearer ", "");

    // 토큰 블랙리스트 검사
    if (req.tokenBlacklist && req.tokenBlacklist.includes(token)) {
        return res
            .status(401)
            .json({ message: "This token is no longer valid" });
    }

    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
        if (error) {
            let errorMessage = "Authentication failed";
            if (error.name === "TokenExpiredError") {
                errorMessage = "Token expired";
            } else if (error.name === "JsonWebTokenError") {
                errorMessage = "Invalid token";
            }
            return res
                .status(401)
                .json({ status: "fail", message: errorMessage });
        }

        if (payload) {
            req.userId = payload._id;
            next();
        } else {
            return res.status(401).json({
                status: "fail",
                message: "Invalid authentication payload",
            });
        }
    });
};

module.exports = authController;
