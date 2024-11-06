const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided.",
            error: null,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid token.",
            error: error.message,
        });
    }
};

module.exports = jwtMiddleware;