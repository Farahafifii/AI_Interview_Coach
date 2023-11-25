const asyncHandler = require("express-async-handler");
const getChatCompletion = require('../helpers/chatHelpers.js');

let messages = [];
const dilimeter = '####';

// only uset once to tell the chatbot the info of the user
const setupChat = asyncHandler(async (req, res) => {
  const { jobTitle, experienceLvl, questionType, notes } = req.body;
  // Generate system message (to be modified)
  const systemMessage = `You are a professional interviewer, you are conducting an interview for a ${jobTitle}. Tailor your questions to focus on ${questionType} and target candidates with ${experienceLvl} level of expertise.
  The interview comprises 5 questions, but be flexible. If the user requests more questions in their additional notes, provide them accordingly.
  User messages will be delimited by ${dilimeter}. Customize your questions based on any specific notes provided by the user: ${dilimeter}${notes}${dilimeter}.
  Follow a structured approach: ask one question at a time, receive the user's answer, and proceed to the next question.
  Follow the next steps to analyze the responses to tailor subsequent questions to the user's background and experience.
  
  Extract Information from User Responses:
  1. Parse and analyze the user's responses to extract relevant information.
  2. Identify key details such as technologies mentioned, experience levels, specific skills, etc.
  
  Use Extracted Information to Customize Questions:
  3. Modify your chatbot logic to use the extracted information to generate context-aware questions.
  4. For example, if the user mentions expertise in a particular programming language, ask more detailed questions about that language.
  
  Maintain Conversation Context:
  5. Keep track of the conversation context, including information gathered from the user.
  6. Use this context to generate follow-up questions that build on previous responses.
  
  At the conclusion of the interview after receiving the answer of the last question from the user, offer detailed feedback.
  Remember, avoid providing feedback on individual answers during the interview. Your feedback should include:
  Strengths: Acknowledge positive attributes, competencies, and strengths. Highlight areas where the candidate demonstrated proficiency, and mention any notable advantages or assets.
  Areas for Improvement: Provide constructive feedback on aspects that can be enhanced. Identify specific areas for growth and suggest opportunities for development.
  Overall: Summarize the user's performance in the interview, providing a holistic view of their strengths and areas for improvement.

  Now, let's start the interview. ask the user the first question`;



  messages.push(
    {'role':'system', 'content':systemMessage},
  );
  const gptResponse = await getChatCompletion(messages.map(msg => ({ role: msg.role, content: msg.content })));
  messages.push({ 'role': 'assistant', 'content': gptResponse });
  res.status(200).json({ completion: gptResponse });
});


const chatWithGPT = async (req, res) => {
  const { userAnswer } = req.body;
  messages.push({ 'role': 'user', 'content': `${dilimeter}${userAnswer}${dilimeter}` });

  const gptResponse = await getChatCompletion(messages.map(msg => ({ role: msg.role, content: msg.content })));
  messages.push({ 'role': 'assistant', 'content': gptResponse });
  console.log(messages);
  res.status(200).json({ completion: gptResponse });
};

module.exports = { setupChat, chatWithGPT };
