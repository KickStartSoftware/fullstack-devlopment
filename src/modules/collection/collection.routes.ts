import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth-middleware';
import { authorizeMiddleware } from '../../middlewares/authorize-middleware';
import { UserRole } from '../user/user.model';
import {
  countCollections,
  countMyCollections,
  createCollection,
  deleteCollection,
  getAllCollections,
  getMyCollections,
  getSingleCollection,
  updateCollection,
} from './collection.controllers';

const collectionRouter = Router();

collectionRouter
  .route('/')
  .get(authMiddleware, getMyCollections)
  .post(authMiddleware, createCollection);
collectionRouter.get(
  '/all',
  authMiddleware,
  authorizeMiddleware(UserRole.ADMIN),
  getAllCollections
);
collectionRouter.get('/count', countCollections);
collectionRouter.get('/count/me', authMiddleware, countMyCollections);
collectionRouter
  .route('/:id')
  .get(authMiddleware, getSingleCollection)
  .patch(authMiddleware, authorizeMiddleware(UserRole.USER), updateCollection)
  .delete(authMiddleware, deleteCollection);

export default collectionRouter;
