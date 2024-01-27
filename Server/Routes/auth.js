const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Middleware function to verify user token
const verifyUser = (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({ error: "Please login" });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.email;
        next();
    } catch (error) {
        res.status(500).json({ error: "Please login again" });
    }
}

// Exporting the middleware
module.exports = {verifyUser};