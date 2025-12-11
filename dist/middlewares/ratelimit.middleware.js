"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    statusCode: 429,
    windowMs: 10 * 60 * 1000,
    message: "Too many frequent requests",
    limit: 100,
    legacyHeaders: false
});
exports.default = limiter;
