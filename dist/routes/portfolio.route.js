"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get('/', auth_middleware_1.default, portfolio_controller_1.portfolioController);
router.get('/holdings', auth_middleware_1.default, portfolio_controller_1.holdingController);
exports.default = router;
