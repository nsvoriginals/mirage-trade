import prisma from "../config/prisma.config";

export async function getPortfolio(userId: string) {
  console.log(`🔍 [getPortfolio] Looking up portfolio for userId: ${userId}`);

  if (!userId) {
    console.error("❌ [getPortfolio] userId is missing");
    throw new Error("User ID is required to fetch portfolio");
  }

  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId },
      include: {

        orders: true,
      },
    });

    console.log("✅ [getPortfolio] Result:", portfolio);
    return portfolio;
  } catch (error: any) {
    console.error("❌ [getPortfolio] Prisma Error:", error.message);
    console.error(error.stack);
    throw new Error("Failed to fetch portfolio");
  }
}

export async function getHoldings(portfolioId: string) {
  console.log(`🔍 [getHoldings] Fetching holdings for portfolioId: ${portfolioId}`);

  if (!portfolioId) {
    console.error("❌ [getHoldings] portfolioId is missing");
    throw new Error("Portfolio ID is required to fetch holdings");
  }

  try {
    const holdings = await prisma.holding.findMany({
      where: { portfolioId },
    });

    console.log("✅ [getHoldings] Result:", holdings);
    return holdings;
  } catch (error: any) {
    console.error("❌ [getHoldings] Prisma Error:", error.message);
    console.error(error.stack);
    throw new Error("Failed to fetch holdings");
  }
}
