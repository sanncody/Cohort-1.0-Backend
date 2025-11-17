const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userModel = require('../models/user.model');

const registerController = async (req, res) => {
    const { username, name, email, password } = req.body;

    const userExists = await userModel.findOne({ username });

    if (userExists) {
        return res.status(409).json({ message: "Username already in use" });
    }

    const user = await userModel.create({
        username,
        name,
        email,
        password: await bcrypt.hash(password, 10)
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie('token', token);

    res.status(201).json({ message: "User registered successfully", user });
};

const loginController = async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: "User account not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    res.cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 ) // 2 days
    });

    res.status(200).json({ message: "User logged in successfully", user });
};

module.exports = { registerController, loginController };