const express = require("express");
const cors = require("cors");

const PORT = 3004;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Our app is running on port: ${PORT}`);
});
