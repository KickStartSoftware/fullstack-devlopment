import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth-middleware';
import { authorizeMiddleware } from '../../middlewares/authorize-middleware';
import { UserRole } from '../user/user.model';
import {
  countDownloads,
  countMyDownloads,
  createDownload,
  createPublicDownload,
  deleteDownload,
  getMyDownloads,
  getPublicdownloads,
  getSingleDownload,
  getSinglePublicDownload,
  updateDownload,
} from './download.controllers';

const downloadRouter = Router();
downloadRouter
  .route('/')
  .post(authMiddleware, createDownload)
  .get(authMiddleware, getMyDownloads);
downloadRouter
  .route('/public')
  .get(getPublicdownloads)
  .post(createPublicDownload);
downloadRouter.get('/count', countDownloads);
downloadRouter.get('/count/me', authMiddleware, countMyDownloads);
downloadRouter.get('/public/:id', getSinglePublicDownload);
downloadRouter
  .route('/:id')
  .get(authMiddleware, getSingleDownload)
  .patch(authMiddleware, authorizeMiddleware(UserRole.ADMIN), updateDownload)
  .delete(authMiddleware, authorizeMiddleware(UserRole.ADMIN), deleteDownload);

export default downloadRouter;
