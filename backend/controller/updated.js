// controller/updated.js
const datas = require("../model/datas");

const updated = async (req, res) => {
  try {
    const updatedTask = await datas.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // match by task id + user
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating task" });
  }
};

module.exports = updated;
