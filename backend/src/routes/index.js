// const getChatCompletion = require('../controllers/chatController');

// const setupRoutes = (app) => {
//   // Define routes and associate them with controllers
//   app.get('/chat', getChatCompletion);
// };

// module.exports = setupRoutes;





const chatRoutes = require('./chatRoutes');

const setupRoutes = (app) => {
  // Use the chat routes
  app.use('/api', chatRoutes);
};

module.exports = setupRoutes;


// const express = require('express');
// const router = express.Router();
// const chatRoutes = require('./chatRoutes');

// router.use('/api', chatRoutes);

// module.exports = router;
