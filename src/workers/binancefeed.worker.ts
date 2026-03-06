import WebSocket from "ws";
import { redisClient, connectRedis } from "../config/redis.config";

const symbols: string[] = [
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

interface BinanceTickerData {
  data?: {
    c: string;
    s: string;
  };
}

interface WebSocketError extends Error {
  code?: string | number;
  errno?: number;
  syscall?: string;
  address?: string;
  port?: number;
}

export default async function initBinanceFeed(): Promise<void> {
  
  await connectRedis();

  const stream: string = symbols.map(s => `${s}@ticker`).join("/");
  const wsUrl: string = `wss://stream.binance.com:9443/stream?streams=${stream}`;
  
  console.log(`Attempting to connect to Binance: ${wsUrl}`);
  
  const ws: WebSocket = new WebSocket(wsUrl);

  ws.on("open", (): void => {
    console.log("price feeder started working");
  });

  ws.on("message", async (msg: WebSocket.Data): Promise<void> => {
    try {
      const data: BinanceTickerData = JSON.parse(msg.toString());
      const ticker = data?.data;
      if (!ticker) return;

      const price: string = ticker.c;
      const symbol: string = ticker.s;

      await redisClient.hSet("crypto:prices", symbol, price);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("error", (error: WebSocketError): void => {
    console.error("WebSocket error details:");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    
    if (error.code !== undefined) console.error("Code:", error.code);
    if (error.errno !== undefined) console.error("Errno:", error.errno);
    if (error.syscall !== undefined) console.error("Syscall:", error.syscall);
    if (error.address !== undefined) console.error("Address:", error.address);
    if (error.port !== undefined) console.error("Port:", error.port);
  });

  ws.on("unexpected-response", (request: WebSocket, response: import('http').IncomingMessage): void => {
    console.error("Unexpected response from Binance:");
    console.error("Status code:", response.statusCode);
    console.error("Status message:", response.statusMessage);
    console.error("Headers:", response.headers);
    
    let body: string = '';
    response.on('data', (chunk: Buffer | string) => {
      body += chunk.toString();
    });
    
    response.on('end', (): void => {
      console.error("Response body:", body);
    });
  });

  ws.on("close", (code: number, reason: Buffer): void => {
    console.log(`Price feeder closed. Code: ${code}, Reason: ${reason.toString()}`);
    console.log("Reconnecting in 3s...");
    setTimeout(initBinanceFeed, 3000);
  });
}