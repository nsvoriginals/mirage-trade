"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const portfolio_route_1 = __importDefault(require("./routes/portfolio.route"));
const ratelimit_middleware_1 = __importDefault(require("./middlewares/ratelimit.middleware"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(ratelimit_middleware_1.default);
app.get('/', (req, res) => {
    res.send("Server is running baby ");
});
app.use('/api/auth', auth_route_1.default);
app.use('/api/portfolio', portfolio_route_1.default);
//app.use(errorHandler)
app.listen(3000, () => {
    console.log("hi there");
});
