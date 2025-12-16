"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.default, portfolio_controller_1.createPortfolioController);
router.get("/", auth_middleware_1.default, portfolio_controller_1.getPortfolioController);
exports.default = router;
