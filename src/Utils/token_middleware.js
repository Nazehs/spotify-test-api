const axios = require("axios");
const querystring = require("qs");

const tokenMiddleWare = async (req, res, next) => {
  console.log("Time:", Date.now());
  const authOptions = {
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  const qs = querystring.stringify({ grant_type: "client_credentials" });
  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs,
    authOptions
  );

  req.headers.Authorization = `Bearer ${data.access_token}`;
  console.log("middleware");
  next();
};
module.exports = tokenMiddleWare;
