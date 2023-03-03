const express = require("express");
const crypto = require("crypto");
var bodyParser = require("body-parser");
const calcPoints = require("./calcPoints");
const app = express();
app.use(bodyParser.json());

const receipts = {};

app.get("/", (req, res) => res.send("Receipt-Processor-Challenge"));

app.get("/receipts/:id/points", (req, res) => {
  let receipt = receipts[req.params.id];
  let points = calcPoints(receipt);
  res.json({ points });
});

app.post("/receipts/process", (req, res) => {
  let newId = crypto.randomUUID();
  receipts[newId] = req.body;
  res.json({ id: newId });
});

app.listen(3000, () => {
  console.log("running on 3000...");
});
