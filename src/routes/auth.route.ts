import express,{Request,Response} from 'express';
import { loginController, meController, registerController } from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router=express.Router();

router.get('/me',authMiddleware,meController)



router.post('/login',loginController)

router.post('/register',registerController)

export default router;