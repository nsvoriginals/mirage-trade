# 🎯 Mirage - Real-Time Paper Trading Platform

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Redis](https://img.shields.io/badge/Redis-v7.0-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Prisma](https://img.shields.io/badge/Prisma-v5.0-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![WebSocket](https://img.shields.io/badge/Socket.io-v4.0-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)

**Practice trading with real market data, zero risk.**

[Features](#-features) • [Getting Started](#-getting-started) • [API Documentation](#-api-documentation) • [Architecture](#-architecture) • [Contributing](#-contributing)

![Mirage Demo](./docs/demo.gif)

</div>

---

## 📖 About

**Mirage** is a high-performance paper trading simulator that allows users to practice trading cryptocurrencies and stocks with **$100,000 virtual cash**. Built with real-time market data integration, it provides an authentic trading experience without financial risk.

### Why Mirage?

- 📊 **Real Market Data** - Live prices from Binance WebSocket
- ⚡ **Instant Execution** - Market orders execute in milliseconds
- 📈 **Advanced Orders** - Market, limit, and stop-loss order types
- 🔄 **Real-Time Updates** - Portfolio values update automatically
- 🎯 **Production-Ready** - Built with enterprise-grade architecture

---

## ✨ Features

### 🔐 User Management
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected API routes with middleware
- User sessions managed via Redis

### 💼 Portfolio Management
- Start with **$100,000** virtual cash
- Track multiple asset holdings
- Real-time portfolio valuation
- Calculate profit/loss per position
- View total portfolio returns

### 📊 Trading Engine
- **Market Orders** - Execute instantly at current price
- **Limit Orders** - Execute when price reaches target
- **Stop-Loss Orders** - Automatic risk management
- Atomic transactions prevent race conditions
- Complete audit trail of all trades

### 💹 Live Market Data
- **Top 10 Cryptocurrencies**
  - BTC, ETH, SOL, BNB, ADA, DOGE, MATIC, DOT, AVAX, LINK
- Real-time price updates (1-5 second intervals)
- 24-hour price change tracking
- Volume and market cap data
- Redis caching for sub-millisecond response times

### 📈 Analytics
- Portfolio performance tracking
- Individual position P&L
- Win rate calculations
- Trade history with execution prices
- Historical price data for charting

---

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                      Client (Web/Mobile)                     │
│                  React + Socket.io Client                    │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS + WSS
┌──────────────────────▼──────────────────────────────────────┐
│                   Express API Gateway                        │
│         JWT Auth • Rate Limiting • CORS • Compression        │
└──────┬───────────────────────────────────────────┬──────────┘
       │                                           │
       │ REST API                                  │ WebSocket
       │                                           │
┌──────▼──────────┐                    ┌──────────▼──────────┐
│  Trading API    │                    │  WebSocket Server   │
│                 │                    │   (Socket.io)       │
│ • Place Orders  │                    │                     │
│ • Get Portfolio │                    │ • Live Prices       │
│ • Trade History │                    │ • Order Fills       │
│ • Market Data   │                    │ • Portfolio Updates │
└──────┬──────────┘                    └──────────┬──────────┘
       │                                           │
       │         ┌──────────────────┐             │
       └─────────► Redis Cache      ◄─────────────┘
                 │                  │
                 │ • Live Prices    │
                 │ • Order Book     │
                 │ • User Sessions  │
                 │ • Rate Limits    │
                 └────────┬─────────┘
                          │
       ┌──────────────────▼──────────────────┐
       │    SQLite Database (Prisma ORM)     │
       │                                     │
       │ • Users & Auth                      │
       │ • Portfolios & Holdings             │
       │ • Orders & Trades                   │
       │ • Market Price Cache                │
       └──────────────┬──────────────────────┘
                      │
       ┌──────────────▼──────────────────────┐
       │      Background Workers              │
       │                                     │
       │ • Market Data Ingestion (Binance)   │
       │ • Order Matching Engine             │
       │ • Portfolio Value Calculator        │
       └─────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- **Redis** v7.0.0 or higher
- **Git**

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/nsvoriginals/mirage-trade.git
   cd mirage-trade/backend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Configure environment variables**
```bash
   cp .env.example .env
```

   Edit `.env`:
```env
   # Server
   PORT=3000
   NODE_ENV=development

   # Database
   DATABASE_URL="file:./dev.db"

   # Redis
   REDIS_URL=redis://localhost:6379
   REDIS_PASSWORD=

   # JWT
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRES_IN=7d

   # API Keys (Optional - for stock data)
   ALPHA_VANTAGE_API_KEY=your_key_here
```

4. **Start Redis**
```bash
   # Using Docker
   docker run -d -p 6379:6379 redis:7-alpine

   # Or using Homebrew (macOS)
   brew services start redis

   # Or using apt (Linux)
   sudo service redis-server start
```

5. **Initialize database**
```bash
   # Generate Prisma Client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev --name init

   # (Optional) Seed sample data
   npm run seed
```

6. **Start the development server**
```bash
   npm run dev
```

   Server will start at `http://localhost:3000`

---

## 📁 Project Structure
```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # Prisma client setup
│   │   └── redis.ts         # Redis connection
│   │
│   ├── controllers/         # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── portfolio.controller.ts
│   │   ├── order.controller.ts
│   │   └── market.controller.ts
│   │
│   ├── services/            # Business logic
│   │   ├── auth.service.ts
│   │   ├── trading.service.ts
│   │   ├── portfolio.service.ts
│   │   └── marketData.service.ts
│   │
│   ├── middleware/          # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── rateLimit.middleware.ts
│   │
│   ├── routes/              # API routes
│   │   ├── auth.routes.ts
│   │   ├── trading.routes.ts
│   │   └── market.routes.ts
│   │
│   ├── workers/             # Background jobs
│   │   ├── priceFeeder.ts   # Binance WebSocket
│   │   └── orderMatcher.ts  # Limit order execution
│   │
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   │
│   ├── utils/               # Helper functions
│   │   ├── jwt.ts
│   │   └── validation.ts
│   │
│   └── server.ts            # Entry point
│
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Migration files
│
├── tests/                   # Test files
│   ├── unit/
│   └── integration/
│
├── docs/                    # Documentation
│   ├── api.md
│   └── architecture.md
│
├── .env.example             # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📡 API Documentation

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "trader@example.com",
  "username": "crypto_trader",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "trader@example.com",
    "username": "crypto_trader"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "trader@example.com",
  "password": "SecurePass123!"
}
```

### Trading

#### Place Order
```http
POST /api/trading/orders
Authorization: Bearer 
Content-Type: application/json

{
  "symbol": "BTCUSDT",
  "type": "market",
  "side": "buy",
  "quantity": 0.01
}
```

**Response:**
```json
{
  "order": {
    "id": "uuid",
    "symbol": "BTCUSDT",
    "type": "market",
    "side": "buy",
    "quantity": 0.01,
    "status": "filled",
    "filledAt": "2024-12-11T10:30:00Z"
  },
  "trade": {
    "id": "uuid",
    "price": 43250.50,
    "totalValue": 432.51
  }
}
```

#### Get Portfolio
```http
GET /api/trading/portfolio
Authorization: Bearer 
```

**Response:**
```json
{
  "id": "uuid",
  "cashBalance": 95000.00,
  "totalValue": 105340.75,
  "totalReturn": 5.34,
  "holdings": [
    {
      "symbol": "BTCUSDT",
      "quantity": 0.1,
      "avgCost": 42000.00,
      "currentPrice": 43250.50,
      "currentValue": 4325.05,
      "profitLoss": 125.05,
      "profitLossPercent": 2.98
    }
  ]
}
```

#### Get Trade History
```http
GET /api/trading/trades?limit=50&offset=0
Authorization: Bearer 
```

### Market Data

#### Get Live Prices
```http
GET /api/markets/prices
```

**Response:**
```json
[
  {
    "symbol": "BTCUSDT",
    "price": 43250.50,
    "change24h": 2.34,
    "volume24h": 1234567890,
    "timestamp": 1702345678000
  }
]
```

#### Get Asset Details
```http
GET /api/markets/BTCUSDT
```

### WebSocket Events

**Connect:**
```javascript
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to Mirage');
});
```

**Subscribe to price updates:**
```javascript
socket.emit('subscribe', ['BTCUSDT', 'ETHUSDT']);

socket.on('price:update', (data) => {
  console.log(data);
  // { symbol: 'BTCUSDT', price: 43250.50, change: 2.34 }
});
```

**Portfolio updates:**
```javascript
socket.on('portfolio:update', (data) => {
  console.log(data);
  // { totalValue: 105340.75, todayReturn: 2.3 }
});
```

**Order fill notifications:**
```javascript
socket.on('order:filled', (data) => {
  console.log(data);
  // { orderId: 'uuid', symbol: 'BTCUSDT', price: 43250.50 }
});
```

---

## 🧪 Testing
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.ts

# Watch mode
npm run test:watch
```

---

## 🔧 Development

### Available Scripts
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format

# Database operations
npm run db:migrate     # Run migrations
npm run db:studio      # Open Prisma Studio
npm run db:seed        # Seed database
npm run db:reset       # Reset database
```

### Code Style

This project uses:
- **ESLint** for linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks

---

## 🐳 Docker Deployment
```bash
# Build image
docker build -t mirage-backend .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="file:./data/prod.db" \
  -e REDIS_URL="redis://redis:6379" \
  -e JWT_SECRET="your_secret" \
  mirage-backend
```

**Docker Compose:**
```bash
docker-compose up -d
```

---

## 🛡️ Security

- Passwords hashed with **bcrypt** (10 rounds)
- JWT tokens with secure expiration
- Rate limiting on authentication endpoints
- Input validation and sanitization
- SQL injection protection via Prisma
- CORS configured for production
- Helmet.js for security headers

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
```bash
   git checkout -b feature/amazing-feature
```
3. **Commit your changes**
```bash
   git commit -m 'Add amazing feature'
```
4. **Push to the branch**
```bash
   git push origin feature/amazing-feature
```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

---

## 🙏 Acknowledgments

- [Binance](https://www.binance.com/) for WebSocket API
- [Prisma](https://www.prisma.io/) for amazing ORM
- [Redis](https://redis.io/) for blazing-fast caching
- The open-source community

---

## 📊 Project Status

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/nsvoriginals/mirage-trade)
![GitHub last commit](https://img.shields.io/github/last-commit/nsvoriginals/mirage-trade)
![GitHub issues](https://img.shields.io/github/issues/nsvoriginals/mirage-trade)
![GitHub pull requests](https://img.shields.io/github/issues-pr/nsvoriginals/mirage-trade)

**Current Version:** 1.0.0  
**Status:** Active Development

---

## 🗺️ Roadmap

- [x] User authentication
- [x] Market order execution
- [x] Real-time price feeds
- [x] Portfolio management
- [ ] Limit & stop-loss orders
- [ ] Leaderboards
- [ ] Social features (trade feed)
- [ ] Mobile app (React Native)
- [ ] Advanced charting
- [ ] Trading competitions
- [ ] Options trading simulation

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by developers, for traders

</div>

Additional Files to Create:
.env.example
env# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL="file:./dev.db"

# Redis
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=

# JWT Authentication
JWT_SECRET=change_this_to_a_random_secure_string
JWT_EXPIRES_IN=7d

# Market Data APIs (Optional)
ALPHA_VANTAGE_API_KEY=
POLYGON_API_KEY=
```

### `LICENSE` (MIT)
```
MIT License

Copyright (c) 2024 nsvoriginals

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE