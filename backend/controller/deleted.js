const Task = require("../model/datas");

const deleted = async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        res.status(401).json({ message: "task deleted" });
    } catch (err) {
        res.status(500).json({ error: "error deleting task" });
    }
};

module.exports =deleted;