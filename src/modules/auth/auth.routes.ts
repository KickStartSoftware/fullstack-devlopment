import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth-middleware';
import {
  forgotPassword,
  loginUser,
  registerUser,
  resetPassword,
  showMe,
} from './auth.controllers';

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);
authRouter.get('/me', authMiddleware, showMe);

export default authRouter;
