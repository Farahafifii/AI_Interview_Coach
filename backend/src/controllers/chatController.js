const openai = require('../config/openaiConfig.js');

//import asyncHandler from "express-async-handler";

// const asyncErrorHandler = (handler) => async (req, res, next) => {
//   try {
//     await handler(req, res, next);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const sendAnswerToGPT = asyncErrorHandler(async (req, res) => {
//   const { jobTitle, questionType, notes } = req.body;

//   // Generate system message
//   const systemMessage = `Question about ${jobTitle} with type ${questionType}. Additional notes: ${notes}`;

//   const chatCompletion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ "role": "user", "content": systemMessage }],
//   });

//   res.json({ completion: chatCompletion.choices[0].message });
// });

// module.exports = sendAnswerToGPT;


const sendAnswerToGPT = async (req, res) => {
  try {
    // Get user message from request body
    const userMessage = req.body.message;

    // Use OpenAI API to get a response
    const response = await openai.complete({
      model: 'text-davinci-003',
      prompt: userMessage,
      max_tokens: 150,
    });

    // Extract the generated response from OpenAI
    const chatbotResponse = response.choices[0].text.trim();

    // Send the response to the user
    res.status(200).json({ response: chatbotResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = sendAnswerToGPT;
