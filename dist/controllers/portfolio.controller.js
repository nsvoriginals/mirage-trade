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
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioController = portfolioController;
exports.holdingController = holdingController;
const portfolio_service_1 = require("../services/portfolio.service");
function portfolioController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.id;
        try {
            const portfolioDetails = yield (0, portfolio_service_1.getPortfolio)(userId);
            if (!portfolioDetails) {
                return res.status(400).json({
                    message: "Portfolio Details not found"
                });
            }
            return res.status(200).json({
                message: "Portfolio detailes fetched successfully",
                portfolioDetails,
                id: portfolioDetails.id
            });
        }
        catch (e) {
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    });
}
function holdingController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.user.id;
        try {
            const portfolioDetails = yield (0, portfolio_service_1.getPortfolio)(userId);
            if (!portfolioDetails) {
                return res.status(400).json({
                    message: "Portfolio Details not found"
                });
            }
            const holdingDetails = yield (0, portfolio_service_1.getHoldings)(portfolioDetails.id);
            if (!holdingDetails) {
                return res.status(400).json({
                    message: "Portfolio Details not found"
                });
            }
            return res.status(200).json({
                message: "Portfolio detailes fetched successfully",
                holdingDetails,
            });
        }
        catch (e) {
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    });
}
