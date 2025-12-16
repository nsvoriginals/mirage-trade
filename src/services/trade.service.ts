import prisma from '../config/prisma.config'

export async function getAllTrades(userId: string) {
  return prisma.trade.findMany({
    where: { userId },
    orderBy: { executedAt: "desc" },
  });
}

export async function getBuyTrades(userId: string) {
  return prisma.trade.findMany({
    where: {
      userId,
      side: "BUY",
    },
    orderBy: { executedAt: "desc" },
  });
}

export async function getSellTrades(userId: string) {
  return prisma.trade.findMany({
    where: {
      userId,
      side: "SELL",
    },
    orderBy: { executedAt: "desc" },
  });
}

export async function getTradeById(userId: string, tradeId: string) {
  return prisma.trade.findFirst({
    where: {
      id: tradeId,
      userId, 
    },
  });
}
