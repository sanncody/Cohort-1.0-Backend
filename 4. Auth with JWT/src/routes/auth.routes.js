const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, name, email, password } = req.body;

    const user = await userModel.create({
        username,
        name,
        email,
        password
    });

    // Token creation
    // Note: Generate JWT SECRET using website -> 'https://jwtsecrets.com/'
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token);

    res.status(201).json({ message: "User registered successfully!!", user, token });

});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check user's username
    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: "User account not found" });
    }

    // Check user's password 
    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Password" });
    }

    res.status(200).json({ message: "User logged in successfully" });
});

router.get('/user', async (req, res) => {
    const { token } = req.cookies;
    console.log(req.cookies);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorised" });
    }

    try {
        // jwt.verify() checks that our token is correct or not
        const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // We can use .select() to omit sending password and version at client side
        const user = await userModel.findOne({ _id: decodedData.id  }).select('-password -__v').lean();

        res.status(200).json({
            message: "User data fetched successfully",
            user
        });
        
    } catch (error) {
        return res.status(401).json({ 
            message: "Unauthorised - Invalid Token"
        })
    }
});

module.exports = router;