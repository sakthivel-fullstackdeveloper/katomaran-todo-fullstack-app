const datas = require("../model/datas");

const fetched = async (req, res) => {
    try {
        const data = await datas.find({ userId: req.user._id });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: "Error fetching tasks" });
    }
};

module.exports = fetched;