/**
 * Author: ItachiXD
 * API: Facebook Video Downloader
 * Format: CommonJS (for Vercel)
 */

const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Missing 'url' query parameter",
      });
    }

    const apiUrl = `https://serverless-tooly-gateway-6n4h522y.ue.gateway.dev/facebook/video?url=${encodeURIComponent(
      url
    )}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
        Origin: "https://chative.id",
        Referer: "https://chative.io/",
        "Sec-Ch-Ua": `"Chromium";v="137", "Not/A)Brand";v="24"`,
        "Sec-Ch-Ua-Mobile": "?1",
        "Sec-Ch-Ua-Platform": `"Android"`,
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
      },
    });

    const raw = await response.json();

    return res.status(200).json({
      success: true,
      author: "ItachiXD",
      title: raw.title,
      urls: {
        hd: raw.videos?.hd?.url || null,
        sd: raw.videos?.sd?.url || null,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      author: "ItachiXD",
      message: "Internal server error",
    });
  }
};
