const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, to your dashboard.` });
});

module.exports = router;
