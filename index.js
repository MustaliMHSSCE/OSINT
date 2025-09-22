require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

const cors = require("cors");
app.use(cors());

// Route for email lookup
app.get("/email/:email", async (req, res) => {
  const email = req.params.email;
  try {
    // Example: Hunter.io email verifier
    const r = await axios.get(`https://api.hunter.io/v2/email-verifier`, {
      params: { email, api_key: process.env.HUNTER_KEY }
    });
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for phone lookup
// Phone lookup with Numlookupapi.com
app.get("/phone-lookup/:number", async (req, res) => {
  const number = req.params.number;
  try {
    const r = await axios.get(`https://api.numlookupapi.com/v1/validate/${number}`, {
      headers: { "apikey": process.env.NUMLOOKUP_KEY }
    });
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.listen(PORT, () => {
  console.log(`OSINT server running on http://localhost:${PORT}`);
});
