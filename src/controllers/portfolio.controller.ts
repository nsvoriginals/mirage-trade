import { Request, Response, NextFunction } from "express";
import { createPortfolio, getPortfolio } from "../services/portfolio.service";

export async function createPortfolioController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id; 

    const portfolio = await createPortfolio(userId);

    return res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: portfolio,
    });
  } catch (err) {
    next(err);
  }
}

export async function getPortfolioController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;

    const portfolio = await getPortfolio(userId);

    return res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (err) {
    next(err);
  }
}
