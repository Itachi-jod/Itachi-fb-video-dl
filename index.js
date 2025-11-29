const axios = require("axios");

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Force pretty print always
  const reply = (obj, status = 200) => {
    res.status(status).send(JSON.stringify(obj, null, 2));
  };

  const path = req.url.split("?")[0];

  // ---------------------------
  // ROOT ENDPOINT: "/"
  // ---------------------------
  if (path === "/" || path === "") {
    return reply({
      success: true,
      name: "Facebook Downloader API",
      author: "ItachiXD",
      endpoints: {
        "/": "API information",
        "/api/facebook?url=VIDEO_URL": "Fetch video thumbnail, sd, hd"
      },
      example: {
        request: "/api/facebook?url=https://www.facebook.com/share/v/17gf68rWqj/",
        response: {
          success: true,
          author: "ItachiXD",
          thumbnail: "https://...",
          sd: "https://...",
          hd: "https://..."
        }
      }
    });
  }

  // ---------------------------
  // MAIN ENDPOINT: "/api/facebook"
  // ---------------------------
  if (path === "/api/facebook") {
    const { url } = req.query;

    if (!url) {
      return reply({
        success: false,
        message: "Missing 'url' parameter"
      }, 400);
    }

    try {
      const apiUrl = `https://facebook-dl.vercel.app/api/facebook?url=${encodeURIComponent(url)}`;

      const { data } = await axios.get(apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K)",
          "Accept": "application/json",
          "Accept-Encoding": "gzip, deflate, br"
        }
      });

      return reply({
        success: true,
        author: "ItachiXD",
        thumbnail: data.thumbnail || null,
        sd: data.sd || null,
        hd: data.hd || null
      });

    } catch (err) {
      return reply({
        success: false,
        error: err.response?.data || err.message
      }, 500);
    }
  }

  // ---------------------------
  // UNKNOWN PATH
  // ---------------------------
  return reply({
    success: false,
    error: "Invalid endpoint",
    available: ["/", "/api/facebook"]
  }, 404);
};
