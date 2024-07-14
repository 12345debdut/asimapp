const { isUser } = require("../../middleware/verification");
const express = require("express");
const router = express.Router();

router.post("/create", isUser, async (req, res) => {});

module.exports = router;
