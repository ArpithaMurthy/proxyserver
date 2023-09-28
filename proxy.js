const express = require("express");
const axios = require("axios");
const cors = require("cors");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Define a route that proxies the request to the target API
app.post("/proxy", async (req, res) => {
  try {
    const { url, method, headers, data } = req.body;
    const response = await axios({
      url,
      method,
      headers,
      data,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Proxy Error" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
