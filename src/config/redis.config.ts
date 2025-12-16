import { createClient } from "redis";

export const redisClient = createClient({
  url: "rediss://default:ATzdAAIncDE3NTRlN2JlMjc5YzE0MDNhYmQ3MmI0MDkwN2M1OWFiN3AxMTU1ODE@cuddly-wren-15581.upstash.io:6379",
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
