require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const token_middleware = require("./Utils/token_middleware");
const PORT = process.env.PORT || 9000;

// add spotify token to the request
app.use(token_middleware);

const init = async (req, res, next) => {
  try {
    console.log(req.headers);

    const newRelease = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      { headers: { Authorization: req.headers.Authorization } }
    );

    res.json(newRelease.data);
  } catch (err) {
    console.log(err.message);
  }
};

app.get("/music", init);

app.listen(PORT, () => console.log("running", PORT));
