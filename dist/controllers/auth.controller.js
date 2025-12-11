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
exports.loginController = loginController;
exports.registerController = registerController;
exports.meController = meController;
const auth_service_1 = require("../services/auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET || "testsecret";
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield (0, auth_service_1.login)(email, password);
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        const token = yield jsonwebtoken_1.default.sign({ user }, secret, { expiresIn: '1 d' });
        console.log(secret);
        return res.status(200).json({
            message: "Login Successful",
            user,
            token
        });
    });
}
function registerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, username, password } = req.body;
        const user = yield (0, auth_service_1.register)(email, username, password);
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        return res.status(200).json({
            message: "Registration Successful",
            user
        });
    });
}
function meController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, auth_service_1.me)(req.body.email);
        return res.status(200).json(user);
    });
}
