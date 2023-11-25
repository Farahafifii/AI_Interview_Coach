const OpenAIApi = require("openai");
require('dotenv').config();

const openaiApiKey = process.env.OPENAI_API_KEY;

// Validate and ensure that the OPENAI_API_KEY is provided
if (!openaiApiKey) {
  console.error("OpenAI API key is missing. Please provide a valid key.");
  process.exit(1);
}


const openai = new OpenAIApi({ key: openaiApiKey });

module.exports = openai;
