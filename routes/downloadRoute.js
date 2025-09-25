const express = require("express");
const router = express.Router();
const { downloadScores } = require("../controllers/downloadController");


router.get("/", downloadScores);

module.exports = router;
