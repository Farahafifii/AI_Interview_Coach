const express = require('express');
const cors = require('cors');
const config = require('./config');
const setupRoutes = require('./routes');
// const {
//   protectAdmin,
//   protectInstructor,
//   protectCorporateTrainee,
//   protectIndividualTrainee,
//   protect,
// } = require('./src/middleware/authMiddleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Add other middlewares as needed

// Setup routes
setupRoutes(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
