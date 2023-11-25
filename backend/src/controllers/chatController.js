const asyncHandler = require("express-async-handler");
const getChatCompletion = require('../helpers/chatHelpers.js');

let messages = [];
const dilimeter = '####';

// only uset once to tell the chatbot the info of the user
const setupChat = asyncHandler(async (req, res) => {
  const { jobTitle, experienceLvl, questionType, notes } = req.body;
  console.log(messages);
  // Generate system message (to be modified)
  const systemMessage = `you are an interview coach.
  you make an interview for a ${jobTitle} by asking him ${questionType} questions ${experienceLvl} level.
  the interview consists of 5 questions unless the user added in the additional notes that he needs more questions then give him more.
  the user messages will be delimited by ${dilimeter}.
  customize the questions according to this user notes (if any): ${dilimeter}${notes}${dilimeter}.
  you ask one question at a time then you receive the user's answer, then ask the next question and so on.
  you analyze the answers and customize the rest of interview questions based on the user's background and experience.
  at the end of the interview give the user a detailed feedback based on his answers, behavior, decision-making process and overall performance in the interview.
  don't give the user any kind of feedback about his answers during the interview.
  the feedback should be in the form
  Strengths: Acknowledge their positive attributes and strengths. Point out specific competencies and strong suits. Highlight areas where they demonstrated proficiency. Mention any notable advantages or assets.
  Areas for Improvement: Provide constructive feedback on aspects that can be enhanced. Highlight specific areas where there is room for growth. Suggest opportunities for development.
  Overall: give overall feedback summary based on his performance in the interview.`;

  const startMessage = `${dilimeter}start my interview${dilimeter}`;

  messages.push(
    {'role':'system', 'content':systemMessage},
    {'role':'user', 'content':startMessage},
  );
  const gptResponse = await getChatCompletion(messages.map(msg => ({ role: msg.role, content: msg.content })));
  messages.push({ 'role': 'assistant', 'content': gptResponse });
  res.status(200).json({ completion: gptResponse });
});


const chatWithGPT = async (req, res) => {
  const userAnswer = req.body;
  let userMessage = `${dilimeter}${userAnswer}${dilimeter}`;
  messages.push({ 'role': 'user', 'content': userMessage });

  const gptResponse = await getChatCompletion(messages.map(msg => ({ role: msg.role, content: msg.content })));

  messages.push({ 'role': 'assistant', 'content': gptResponse });

  res.status(200).json({ completion: gptResponse });
};

module.exports = { setupChat, chatWithGPT };
