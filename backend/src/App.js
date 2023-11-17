const express = require("express");
const app = express();
const port = process.env.PORT || "8000";

const chatController = require("./controllers/chatController");
const cors = require("cors");
app.use(cors());
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

app.use("/", require("./routes/chatRoutes"));
