const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    return res.status(405).send("Method Not Allowed");
  }

  res.setHeader("Access-Control-Allow-Origin", "https://niarosss.github.io");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).send();
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error(
      "Server configuration error: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing."
    );
    return res.status(500).json({
      success: false,
      error:
        "Server configuration error: Telegram token or chat ID is missing.",
    });
  }

  try {
    const { name, type, text } = req.body;

    const message = `Повідомлення з шаблонів
Ім'я: ${name}
Тип: ${type}
Повідомлення:
${text}
`;
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await axios.post(telegramApiUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      parse_mode: "html",
      text: message,
    });

    if (telegramResponse.status === 200) {
      return res.status(200).json({
        success: true,
        message: "Message sent successfully",
        telegramData: telegramResponse.data,
      });
    } else {
      console.error(
        "Telegram API responded with non-200 status:",
        telegramResponse.status,
        telegramResponse.data
      );
      return res.status(telegramResponse.status).json({
        success: false,
        error: "Failed to send message to Telegram",
        telegramError: telegramResponse.data,
      });
    }
  } catch (error) {
    console.error("Error in Vercel Function (Telegram API call):", error);
    if (error.response) {
      return res.status(error.response.status || 500).json({
        success: false,
        error: "Error from Telegram API",
        details: error.response.data,
      });
    }
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message,
    });
  }
};
