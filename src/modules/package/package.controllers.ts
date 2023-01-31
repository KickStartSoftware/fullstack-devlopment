import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ThrowException } from '../../exceptions/throw-exception';
import { PackageDto } from './package.dto';
import { PACKAGE } from './package.model';
import { Utils } from '../../util';
import { CATEGORY } from '../category/category.model';

// count packages
export const countPackages = async (req: Request, res: Response) => {
  const count = await PACKAGE.count({});
  return res.status(StatusCodes.OK).json({
    count,
  });
};

// create package
export const createPackage = async (req: Request, res: Response) => {
  const packageDto = new PackageDto(req.body);
  const existingPackage = await PACKAGE.findOne({ name: packageDto.name });
  if (existingPackage) {
    ThrowException.badRequest('Package already exist');
  }

  const category = await CATEGORY.findById(packageDto.category);
  if (!category) {
     ThrowException.badRequest(`No category with id:${packageDto.category}`);
  }

  const software = await PACKAGE.create(packageDto);
  return res.status(StatusCodes.CREATED).json(software);
};

// get all packages
export const getAllPackages = async (req: Request, res: Response) => {
  const softwares = await PACKAGE.find({})
    .sort('-createdAt')
    .populate('category', '_id name');
  return res.status(StatusCodes.OK).json({
    total: softwares.length,
    data: softwares,
  });
};

// get single package
export const getSinglePackage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const software = await PACKAGE.findById(id).populate('category');
  if (!software) {
    ThrowException.badRequest(`Software with this id :${id} cannot be found`);
  }
  return res.status(StatusCodes.OK).json(software);
};

// update software package
export const updatePackage = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (Utils.isEmpty(req.body)) {
    ThrowException.badRequest('provide new data for this software');
  }
  const packageDto = new PackageDto(req.body);
  const { name, category, numberOfDownloads, win32url, win64url } = packageDto;

  const software = await PACKAGE.findById(id);
  if (!software) {
    ThrowException.badRequest(`Software with this id :${id} cannot be found`);
  }

  if (name) {
    const existingPackage = await PACKAGE.findOne({ name: packageDto.name });
    if (existingPackage) {
      ThrowException.badRequest('Package already exist');
    }
    software!.name = name;
  }
  if (category) software!.category = category as any;
  if (numberOfDownloads) software!.numberOfDownloads = numberOfDownloads;
  if (win32url) software!.win32url = win32url;
  if (win64url) software!.win64url = win64url;

  await software?.save();
  return res.status(StatusCodes.OK).json(software);
};

// delete software package
export const deletePackage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const software = await PACKAGE.findById(id);
  if (!software) {
    ThrowException.badRequest(`Software with this id :${id} cannot be found`);
  }

  await software?.remove();
  return res.status(StatusCodes.NO_CONTENT).send();
};
