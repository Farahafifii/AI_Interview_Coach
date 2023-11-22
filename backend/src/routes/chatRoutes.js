const express = require("express");
const router = express.Router();
const sendAnswerToGPT = require("../controllers/chatController");

router.post("/chat", sendAnswerToGPT);

module.exports = router;