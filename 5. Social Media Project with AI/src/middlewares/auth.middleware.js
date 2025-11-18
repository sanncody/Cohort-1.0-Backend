const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access - Please login first" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findOne({ _id: decoded.id });

        req.user = user; // We'll pass this user to req.user so that loggedin user data can be accessed

        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid Token - please login again" });
    }
};

module.exports = authMiddleware;