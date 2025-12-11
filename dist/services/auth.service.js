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
exports.login = login;
exports.register = register;
exports.me = me;
const prisma_config_1 = __importDefault(require("../config/prisma.config"));
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_config_1.default.user.findUnique({
            where: {
                email,
                password
            }
        });
        if (!user)
            throw new Error("User Not found");
        return { message: "Login Successful", user };
    });
}
function register(email, username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_config_1.default.user.findUnique({
            where: {
                email,
                password
            }
        });
        if (user)
            throw new Error("User Already found found");
        const newUser = yield prisma_config_1.default.user.create({
            data: {
                email,
                username,
                password
            }
        });
        return { message: "Registration Successful", newUser };
    });
}
function me(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_config_1.default.user.findUnique({
            where: {
                email,
            }
        });
        if (!user)
            throw new Error("User Not found ");
        return { message: "Fetch Successful", user };
    });
}
