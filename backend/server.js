const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// DB
mongoose.connect("mongodb://127.0.0.1:27017/easeworkflow");

// Schema
const visitorSchema = new mongoose.Schema({
  ip: String,
  country: String,
  device: String,
  browser: String,
  page: String,
  time: { type: Date, default: Date.now }
});

const Visitor = mongoose.model("Visitor", visitorSchema);

// TRACK API (AUTO SMART)
app.post("/track", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // IP INFO (country auto detect)
    const geo = await axios.get(`http://ip-api.com/json/${ip}`);

    const data = new Visitor({
      ip,
      country: geo.data.country,
      device: req.body.device,
      browser: req.body.browser,
      page: req.body.page
    });

    await data.save();

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: err.message });
  }
});

// GET DATA (dashboard)
app.get("/visitors", async (req, res) => {
  const data = await Visitor.find().sort({ time: -1 });
  res.json(data);
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});