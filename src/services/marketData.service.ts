import { redisClient, connectRedis } from "../config/redis.config";


export async function getCryptoPrice(symbol: string) {
    await connectRedis();

    const price = await redisClient.hGet(
        "crypto:prices",
        symbol.toUpperCase()
    );

    if (!price) return null;

    return Number(price);
}


export async function getAllCryptoPrices() {
    await connectRedis();
    const prices = await redisClient.hGetAll("price:*")
    if (Object.keys(prices).length === 0) return null;
    return prices;
}