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
exports.createPortfolioController = createPortfolioController;
exports.getPortfolioController = getPortfolioController;
const portfolio_service_1 = require("../services/portfolio.service");
function createPortfolioController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.id;
            const portfolio = yield (0, portfolio_service_1.createPortfolio)(userId);
            return res.status(201).json({
                success: true,
                message: "Portfolio created successfully",
                data: portfolio,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function getPortfolioController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.user.id;
            const portfolio = yield (0, portfolio_service_1.getPortfolio)(userId);
            return res.status(200).json({
                success: true,
                data: portfolio,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
