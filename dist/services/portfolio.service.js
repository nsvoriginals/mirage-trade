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
exports.createPortfolio = createPortfolio;
exports.getPortfolio = getPortfolio;
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
const marketData_service_1 = require("./marketData.service");
function createPortfolio(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const portfolio = yield prisma_config_1.default.portfolio.create({
                data: {
                    userId,
                    cashBalance: 100000,
                    totalValue: 100000,
                    initialBalance: 100000,
                }
            });
            if (!portfolio) {
                throw new Error("Portfolio not created");
            }
        }
        catch (e) {
            console.log("errors occured");
        }
    });
}
function getPortfolio(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const portfolio = yield prisma_config_1.default.portfolio.findUnique({
            where: { userId },
            include: { holdings: true },
        });
        if (!portfolio) {
            throw new Error("Portfolio not found");
        }
        const computed = yield computeLatestPortfolio(portfolio);
        return computed;
    });
}
function computeLatestPortfolio(portfolio) {
    return __awaiter(this, void 0, void 0, function* () {
        let holdingsValue = 0;
        const holdingsWithValue = yield Promise.all(portfolio.holdings.map((holding) => __awaiter(this, void 0, void 0, function* () {
            const price = yield (0, marketData_service_1.getCryptoPrice)(holding.symbol);
            const currentValue = holding.quantity * price;
            const investedValue = holding.quantity * holding.avgCost;
            holdingsValue += currentValue;
            return Object.assign(Object.assign({}, holding), { currentPrice: price, currentValue, pnl: currentValue - investedValue });
        })));
        const totalValue = portfolio.cashBalance + holdingsValue;
        return {
            id: portfolio.id,
            cashBalance: portfolio.cashBalance,
            totalValue,
            totalReturn: ((totalValue - portfolio.initialBalance) /
                portfolio.initialBalance) *
                100,
            holdings: holdingsWithValue,
        };
    });
}
