const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth");
const created = require("../controller/creatd");
const fetched = require("../controller/fetched");
const updated = require("../controller/updated");
const deleted = require("../controller/deleted");
const  googleLogin  = require("../controller/authed");

router.get("/", (req, res) => res.send("backend is running"));
router.post("/google-login", googleLogin);
router.post("/create", authenticate, created);
router.get("/fetch", authenticate, fetched);
router.put("/update:id", authenticate, updated);
router.delete("/delete:id", authenticate, deleted);

module.exports = router;
