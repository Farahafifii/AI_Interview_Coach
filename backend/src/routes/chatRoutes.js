const express = require("express");
const router = express.Router();
const { setupChat, chatWithGPT } = require("../controllers/chatController");

router.post("/startChat", setupChat);
router.post("/interview", chatWithGPT);

module.exports = router;