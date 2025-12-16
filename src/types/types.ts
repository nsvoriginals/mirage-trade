export type UUID = string;
export type ISODateString = string;

export type OrderSide = "BUY" | "SELL";



export type OrderStatus =
  | "pending"
  | "filled"
  | "cancelled"
  | "rejected";

export type TradeSide = OrderSide;

export interface User {
  id: UUID;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  portfolio?: Portfolio | null;
  orders: Order[];
  trades: Trade[];
}

export interface SafeUser {
  id: UUID;
  email: string;
  username: string;
  createdAt: Date;
}

export interface CreateUserInput {
  email: string;
  username: string;
  password: string;
}

export interface LoginInput {
  emailOrUsername: string;
  password: string;
}

export interface Portfolio {
  id: UUID;
  userId: UUID;
  cashBalance: number;
  totalValue: number;
  initialBalance: number;
  createdAt: Date;
  holdings: Holding[];
  orders: Order[];
}

export interface CreatePortfolioInput {
  userId: UUID;
}

export interface PortfolioSummary {
  cashBalance: number;
  totalValue: number;
  investedValue: number;
  pnl: number;
  pnlPercent: number;
}

export interface Holding {
  id: UUID;
  portfolioId: UUID;
  symbol: string;
  quantity: number;
  avgCost: number;
  updatedAt: Date;
}

export interface UpdateHoldingInput {
  portfolioId: UUID;
  symbol: string;
  quantityDelta: number;
  executionPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  portfolioId: string;
  symbol: string;
  type: string;
  side: string;
  quantity: number;
  price?: number | null;
  status: string;
  createdAt: Date;
  filledAt?: Date | null;
  trades?: Trade[];
}

export interface PlaceOrderInput {
  symbol: string;
  type: string;
  side: string;
  quantity: number;
  price?: number;
}

export interface OrderExecution {
  orderId: UUID;
  executedQuantity: number;
  executedPrice: number;
  fee?: number;
}

export interface Trade {
  id: UUID;
  orderId: UUID;
  userId: UUID;
  symbol: string;
  side: TradeSide;
  quantity: number;
  price: number;
  totalValue: number;
  fee: number;
  executedAt: Date;
}

export interface CreateTradeInput {
  orderId: UUID;
  userId: UUID;
  symbol: string;
  side: TradeSide;
  quantity: number;
  price: number;
  fee?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: SafeUser;
  tokens: AuthTokens;
}

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
}

export interface RegisterResult {
  newUser: SafeUser;
  portfolio: Portfolio;
}

export interface LoginResult {
  user: SafeUser;
  tokens: AuthTokens;
}

export interface PnLBreakdown {
  symbol: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
  investedValue: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
}

export interface PortfolioAnalytics {
  totalInvested: number;
  totalValue: number;
  totalPnL: number;
  totalPnLPercent: number;
  holdings: PnLBreakdown[];
}
