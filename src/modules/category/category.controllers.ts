import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ThrowException } from '../../exceptions/throw-exception';
import { CategoryDto } from './category.dto';
import { CATEGORY } from './category.model';

// count categories
export const countCategories = async (req: Request, res: Response) => {
  const count = await CATEGORY.count({});
  return res.status(StatusCodes.OK).json({
    count,
  });
};

// create category
export const createCategory = async (req: Request, res: Response) => {
  const categoryDto = new CategoryDto(req.body);

  const category = await CATEGORY.create(categoryDto);
  return res.status(StatusCodes.CREATED).json(category);
};

// get all categories
export const getAllCategories = async (req: Request, res: Response) => {
  const categories = await CATEGORY.find({}).sort('-createdAt');
  return res.status(StatusCodes.OK).json({
    total: categories.length,
    data: categories,
  });
};

// get Single category
export const getSingleCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await CATEGORY.findById(id);
  if (!category) {
    ThrowException.notFound(`No category with id:${id}`);
  }
  return res.status(StatusCodes.OK).json(category);
};

// update category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryDto = new CategoryDto(req.body);

  if (!categoryDto.name) {
    ThrowException.badRequest('Provide a name for this category');
  }

  const category = await CATEGORY.findById(id);
  if (!category) {
    ThrowException.notFound(`No category with id:${id}`);
  }

  if (category!.name === categoryDto.name) {
    ThrowException.badRequest('Provide a new name');
  }

  category!.name = categoryDto.name;
  await category?.save();
  return res.status(StatusCodes.OK).json(category);
};

// delete category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await CATEGORY.findById(id);
  if (!category) {
    ThrowException.notFound(`No category with id:${id}`);
  }

  await category!.remove();
  return res.status(StatusCodes.NO_CONTENT).send();
};
