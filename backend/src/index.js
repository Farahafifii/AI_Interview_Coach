const config = require('./config');
const chatRouter = require("./routes/chatRoutes");
const app = require('./App.js');


// Define a home route
app.get('/home', (req, res) => {
  res.status(200).send('You have everything installed!');
});

// Use the chat routes
app.use("/api", chatRouter); 

const PORT = config.server.port;
//const HOST = config.server.host;

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});

