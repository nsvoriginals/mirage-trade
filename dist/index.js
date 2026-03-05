"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const portfolio_route_1 = __importDefault(require("./routes/portfolio.route"));
const ratelimit_middleware_1 = __importDefault(require("./middlewares/ratelimit.middleware"));
const binancefeed_worker_1 = __importDefault(require("./workers/binancefeed.worker"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const trade_route_1 = __importDefault(require("./routes/trade.route"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(ratelimit_middleware_1.default);
(0, binancefeed_worker_1.default)();
app.get('/', (req, res) => {
    res.send("Server is running baby ");
});
app.use('/api/auth', auth_route_1.default);
app.use('/api/portfolio', portfolio_route_1.default);
app.use('/api/orders', order_route_1.default);
app.use('/api/trades', trade_route_1.default);
//app.use(errorHandler)
app.listen(3000, () => {
    console.log("hi there");
});
