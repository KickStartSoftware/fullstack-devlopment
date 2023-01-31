import { Router } from 'express';
import {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  countCategories,
} from './category.controllers';

const categoryRouter = Router();

categoryRouter.route('/').get(getAllCategories).post(createCategory);
categoryRouter.get('/count', countCategories);
categoryRouter
  .route('/:id')
  .get(getSingleCategory)
  .patch(updateCategory)
  .delete(deleteCategory);

export default categoryRouter;
