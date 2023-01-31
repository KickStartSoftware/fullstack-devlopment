import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth-middleware';
import { authorizeMiddleware } from '../../middlewares/authorize-middleware';
import {
  countUsers,
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from './user.controllers';
import { UserRole } from './user.model';

const userRouter = Router();

userRouter
  .route('/')
  .get(authMiddleware, authorizeMiddleware(UserRole.ADMIN), getAllUsers)
  .post(authMiddleware, authorizeMiddleware(UserRole.ADMIN), createUser);
userRouter.get('/count', countUsers);
userRouter
  .route('/:id')
  .get(authMiddleware, getSingleUser)
  .patch(authMiddleware, updateUser)
  .delete(authMiddleware, authorizeMiddleware(UserRole.ADMIN), deleteUser);

export default userRouter;
