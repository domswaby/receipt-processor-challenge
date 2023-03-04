const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const calcPoints = require("./calcPoints");
const validateReceipt = require("./validateReceipt");

const app = express();
app.use(bodyParser.json());

// in-memory storage of receipts
const receipts = {};

app.get("/", (req, res) => res.send("Receipt-Processor-Challenge"));

// for getting points of a particular receipt
app.get("/receipts/:id/points", (req, res) => {
  // if we can't find that receipt respond with status 404 and a message
  if (!(req.params.id in receipts)) {
    res.status(404);
    res.json({
      message: "No receipt found for that id",
    });
  }
  let receipt = receipts[req.params.id];
  let points = calcPoints(receipt);
  res.json({ points });
});

// for posting new receipts
app.post("/receipts/process", (req, res) => {
  let newId = crypto.randomUUID();
  if (validateReceipt(req.body)) {
    receipts[newId] = req.body;
    res.json({ id: newId });
  } else {
    res.status(400);
    res.json({
      message: "The receipt is invalid",
    });
  }
});

app.listen(8080, () => {
  console.log("running on 8080...");
});
