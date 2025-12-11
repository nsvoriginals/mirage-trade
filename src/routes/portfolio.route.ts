import express from 'express';
import { holdingController, portfolioController } from '../controllers/portfolio.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/',authMiddleware,portfolioController);
router.get('/holdings',authMiddleware,holdingController)

export default router;