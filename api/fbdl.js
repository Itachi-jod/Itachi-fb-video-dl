const axios = require("axios");
const qs = require("qs");

module.exports = async function (req, res) {
  res.setHeader("Content-Type", "application/json"); // force pretty JSON

  try {
    // Allow only GET without showing any extra warning
    if (req.method !== "GET") {
      return res.status(405).send(
        JSON.stringify(
          { error: "Only GET method allowed" },
          null,
          2
        )
      );
    }

    const url = req.query.url;

    if (!url) {
      return res.status(400).send(
        JSON.stringify(
          { error: "Missing ?url=" },
          null,
          2
        )
      );
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

    return res.status(200).send(
      JSON.stringify(
        {
          success: true,
          author: "ItachiXD",
          data: response.data
        },
        null,
        2
      )
    );

  } catch (err) {
    return res.status(500).send(
      JSON.stringify(
        {
          success: false,
          message: "Upstream API failed",
          error: err.message
        },
        null,
        2
      )
    );
  }
};
