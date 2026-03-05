import { createClient } from "redis";

export const redisClient = createClient({
  url: "rediss://default:AflsAAIncDIwNDExODI2NWU4ZDk0MzdlODhmNDkyNWJkZThmNzMzM3AyNjM4NTI@wise-leopard-63852.upstash.io:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
    console.log("Redis connected");
  }
};
