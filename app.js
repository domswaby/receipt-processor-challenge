const express = require("express");
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("hello"));

app.post("/receipts/process", (req, res) => {
  console.log(req.body);
});

app.listen(3000, () => {
  console.log("running on 3000...");
});
