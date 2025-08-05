const datas = require("../model/datas");

const updated = async (req, res) => {
    try {
        const data = await 
        datas.findOneAndUpdate({ _id: req.params.id, userId: req.user._id },req.body,{ new: true });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Error updating task" });
    }
};

module.exports =updated;