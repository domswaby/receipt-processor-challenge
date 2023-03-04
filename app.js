const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const calcPoints = require("./calcPoints");

const app = express();
app.use(bodyParser.json());

// in-memory storage of receipts
const receipts = {};

app.get("/", (req, res) => res.send("Receipt-Processor-Challenge"));

// for getting points of a particular receipt
app.get("/receipts/:id/points", (req, res) => {
  if(!(req.params.id in receipts)){
    res.status(404);
    res.json({
      message: "Receipt not found."
    });
  }
  let receipt = receipts[req.params.id];
  let points = calcPoints(receipt);
  res.json({ points });
});

// for posting new receipts
app.post("/receipts/process", (req, res) => {
  let newId = crypto.randomUUID();
  receipts[newId] = req.body;
  res.json({ id: newId });
});

app.listen(3000, () => {
  console.log("running on 3000...");
});
