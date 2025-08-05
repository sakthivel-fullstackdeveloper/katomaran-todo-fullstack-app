const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, "SECRET_KEY");
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        req.user = user;
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
};
