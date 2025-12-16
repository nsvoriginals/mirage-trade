import { Router } from "express";
import {
  createPortfolioController,
  getPortfolioController,
} from "../controllers/portfolio.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createPortfolioController);
router.get("/", authMiddleware, getPortfolioController);

export default router;
