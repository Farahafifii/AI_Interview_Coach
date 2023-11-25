require('dotenv').config();
//import { openai } from './openaiConfig';

const config = {
  server: {
    port: process.env.PORT || 8000,
    host: process.env.HOST || 'localhost',
  },
//   database: {
//     url: process.env.DB_URL || 'mongodb://localhost:27017/mydatabase',
//   },
  // apiKeys: {
  //   openai: openaiApiKey,
  // },
};

module.exports = config;
