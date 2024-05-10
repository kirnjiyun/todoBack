const userController = {};
const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({ email: email });

        if (user) {
            return res
                .status(409)
                .send({ error: "이미 가입이 된 유저입니다." });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({ email, name, password: hash });
        await newUser.save();
        res.status(200).send({ message: "User created successfully" });
    } catch (error) {
        console.error("Create user error:", error);
        res.status(400).send({ error: "Server error" });
    }
};

module.exports = userController;
