const WebSocket = require("ws");


const symbols = [
  "btcusdt",
  "ethusdt",
  "bnbusdt",
  "xrpusdt",
  "solusdt",
  "adausdt",
  "avaxusdt",
  "dogeusdt",
  "trxusdt",
  "linkusdt",
];

 function initBinanceFeed() {
  const stream = symbols.map(s => `${s}@ticker`).join("/");
  const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${stream}`);

  ws.on("open", () => console.log("📡 Binance WS connected"));

  ws.on("message", async (msg) => {
    const data = JSON.parse(msg.toString());

    const ticker = data?.data;
    if (!ticker) return;

    const symbol = ticker.s;
    const price = ticker.c;

    // Store in Redis
    //await redis.hSet("crypto:prices", symbol, price);

    console.log(`💰 [CRYPTO] ${symbol}: ${price}`);
  });

  ws.on("close", () => {
    console.log("❌ Binance WS closed... reconnecting in 3s");
    setTimeout(initBinanceFeed, 3000);
  });

  ws.on("error", (err) => {
    console.error("❌ Binance Error:", err);
  });
}


initBinanceFeed();