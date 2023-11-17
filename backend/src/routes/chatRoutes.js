const express = require("express");
const router = express.Router();
const {
  sendAnswerToGPT
} = require("../controllers/chatController");

router.get("/chat", sendAnswerToGPT);

module.exports = router;