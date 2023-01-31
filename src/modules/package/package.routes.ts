import { Router } from 'express';
import {
  countPackages,
  createPackage,
  deletePackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
} from './package.controllers';

const packageRouter = Router();

packageRouter.route('/').get(getAllPackages).post(createPackage);
packageRouter.get("/count",countPackages)
packageRouter
  .route('/:id')
  .get(getSinglePackage)
  .patch(updatePackage)
  .delete(deletePackage);

export default packageRouter;
