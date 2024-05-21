require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "kimjiyunee";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.updatedAt;
    delete obj.__v;
    return obj;
};

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
    return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
