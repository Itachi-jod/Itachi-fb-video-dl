const axios = require("axios");
const qs = require("qs");

module.exports = async function (req, res) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Only GET method allowed" });
    }

    const url = req.query.url;

    if (!url) {
      return res.status(400).json({ error: "Missing ?url=" });
    }

    const body = qs.stringify({ url });

    const response = await axios.post(
      "https://fbdown.blog/get.php",
      body,
      {
        headers: {
          "authority": "fbdown.blog",
          "accept": "application/json",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded",
          "origin": "https://fbdown.blog",
          "referer": "https://fbdown.blog/",
          "sec-ch-ua": `"Chromium";v="137", "Not/A)Brand";v="24"`,
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": `"Android"`,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
          "accept-encoding": "gzip, deflate, br"
        }
      }
    );

    return res.json({
      success: true,
      author: "ItachiXD",
      data: response.data
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Upstream API failed",
      error: err.message
    });
  }
};
