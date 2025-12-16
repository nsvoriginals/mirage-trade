import prisma from "../config/prisma.config";
import { getCryptoPrice } from "./marketData.service";
import { Portfolio } from "../types/types";



export async function createPortfolio(userId: string) {
  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        userId,
        cashBalance: 100000,
        totalValue: 100000,
        initialBalance: 100000,
      }
    });
    if (!portfolio) {
      throw new Error("Portfolio not created")
    }
  } catch (e) {
    console.log("errors occured");
  }
}
export async function getPortfolio(userId: string) {
  const portfolio = await prisma.portfolio.findUnique({
    where: { userId },
    include: { holdings: true },
  });

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  const computed = await computeLatestPortfolio(portfolio);
  return computed;
}



async function computeLatestPortfolio(portfolio: any) {
  let holdingsValue = 0;

  const holdingsWithValue = await Promise.all(
    portfolio.holdings.map(async (holding: any) => {
      const price = await getCryptoPrice(holding.symbol);
      const currentValue = holding.quantity * price!;
      const investedValue = holding.quantity * holding.avgCost;

      holdingsValue += currentValue;

      return {
        ...holding,
        currentPrice: price,
        currentValue,
        pnl: currentValue - investedValue,
      };
    })
  );

  const totalValue = portfolio.cashBalance + holdingsValue;

  return {
    id: portfolio.id,
    cashBalance: portfolio.cashBalance,
    totalValue,
    totalReturn:
      ((totalValue - portfolio.initialBalance) /
        portfolio.initialBalance) *
      100,
    holdings: holdingsWithValue,
  };
}

