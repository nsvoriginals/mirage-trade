import { Request, Response } from "express";
import {
  getAllTrades,
  getBuyTrades,
  getSellTrades,
  getTradeById,
} from "../services/trade.service";

export async function getTrades(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const trades = await getAllTrades(userId);
    res.json({ success: true, data: trades });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch trades" });
  }
}

export async function getBuyTradesController(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const trades = await getBuyTrades(userId);
    res.json({ success: true, data: trades });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch buy trades" });
  }
}

export async function getSellTradesController(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const trades = await getSellTrades(userId);
    res.json({ success: true, data: trades });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch sell trades" });
  }
}

export async function getTradeByIdController(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const tradeId = req.params.id;

    const trade = await getTradeById(userId, tradeId);
    if (!trade) {
      return res.status(404).json({ success: false, message: "Trade not found" });
    }

    res.json({ success: true, data: trade });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch trade" });
  }
}
