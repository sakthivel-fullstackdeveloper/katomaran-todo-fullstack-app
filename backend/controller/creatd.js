const datas = require("../model/datas");

const creatd = async (req, res) => {

    try {const data = new datas({ ...req.body, userId: req.user._id });
        const saved = await data.save();
        res.status(201).json(saved);} 

    catch (err) {res.status(500).json({ error: "Error creating task", details: err });}
};

module.exports = creatd;