const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: "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" // Change with yours
});


const sendAnswerToGPT = asyncHandler( async (req,res)=>{
  const {jobTilte , questionType , notes} = req.body;
  //generate question using jobTilte , questionType , notes = question
  const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": "question you made "}],
    });
    res.json({completion : chatCompletion.choices[0].message});
})

module.exports = {
  sendAnswerToGPT
};
