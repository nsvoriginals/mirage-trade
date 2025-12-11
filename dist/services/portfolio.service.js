"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolio = getPortfolio;
exports.getHoldings = getHoldings;
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
function getPortfolio(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`🔍 [getPortfolio] Looking up portfolio for userId: ${userId}`);
        if (!userId) {
            console.error("❌ [getPortfolio] userId is missing");
            throw new Error("User ID is required to fetch portfolio");
        }
        try {
            const portfolio = yield prisma_config_1.default.portfolio.findUnique({
                where: { userId },
                include: {
                    orders: true,
                },
            });
            console.log("✅ [getPortfolio] Result:", portfolio);
            return portfolio;
        }
        catch (error) {
            console.error("❌ [getPortfolio] Prisma Error:", error.message);
            console.error(error.stack);
            throw new Error("Failed to fetch portfolio");
        }
    });
}
function getHoldings(portfolioId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`🔍 [getHoldings] Fetching holdings for portfolioId: ${portfolioId}`);
        if (!portfolioId) {
            console.error("❌ [getHoldings] portfolioId is missing");
            throw new Error("Portfolio ID is required to fetch holdings");
        }
        try {
            const holdings = yield prisma_config_1.default.holding.findMany({
                where: { portfolioId },
            });
            console.log("✅ [getHoldings] Result:", holdings);
            return holdings;
        }
        catch (error) {
            console.error("❌ [getHoldings] Prisma Error:", error.message);
            console.error(error.stack);
            throw new Error("Failed to fetch holdings");
        }
    });
}
