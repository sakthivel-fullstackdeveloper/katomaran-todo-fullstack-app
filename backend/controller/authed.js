const User = require("../model/user");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
    const { email, name, gid } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) { 
            user = new User({ email, name, gid });
            await user.save();}
        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};

module.exports = googleLogin;