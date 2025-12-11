import WebSocket from "ws";
import redisClient from "../config/redis.config";


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



export default function initBinanceFeed(){
     const stream = symbols.map(s => `${s}@ticker`).join("/");
     const ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${stream}`);
     ws.on('open',()=>{
        console.log("price feeder startd working")
     })
     ws.on('message',async (msg)=>{
        const data=JSON.parse(msg.toString());
        const ticker = data?.data;
        if (!ticker) return;
        const price = ticker.c;
        const symbol =ticker.s;

        await redisClient.hSet("crypto:prices",symbol,price)
        console.log(`[CRYPTO] ${symbol}: ${price}`);
     })

     ws.on('close',()=>{
        console.log("Price feeder is closing. reconnects automatically in another 3S");
        setTimeout(initBinanceFeed,3000)
     })
}