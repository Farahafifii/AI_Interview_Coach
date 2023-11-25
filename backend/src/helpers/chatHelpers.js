
const openai = require('../config/openaiConfig.js');


const getChatCompletion = async (messages, temperature=1, max_tokens=500) => {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: temperature,
        max_tokens: max_tokens,
      });
    return chatCompletion.choices[0].message.content;
  };

  module.exports = getChatCompletion;