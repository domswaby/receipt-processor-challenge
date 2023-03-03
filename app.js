const express = require("express");
const crypto = require("crypto");
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const receipts = {};

app.get("/", (req, res) => res.send("hello"));

app.get("/receipts/:id/points", (req, res) => {
  let receipt = receipts[req.params.id];
  res.json(receipt);
});

app.post("/receipts/process", (req, res) => {
  let newId = crypto.randomUUID();
  receipts[newId] = req.body;
  console.log(receipts);
  res.json({ id: newId });
});

app.listen(3000, () => {
  console.log("running on 3000...");
});
