import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  getTrades,
  getBuyTradesController,
  getSellTradesController,
  getTradeByIdController,
} from "../controllers/trade.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getTrades);
router.get("/buy", getBuyTradesController);
router.get("/sell", getSellTradesController);
router.get("/:id", getTradeByIdController);

export default router;
