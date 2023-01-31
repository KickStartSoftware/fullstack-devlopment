import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { USER } from '../user/user.model';
import { CATEGORY } from '../category/category.model';
import { PACKAGE } from '../package/package.model';
import { DOWNLOAD } from '../download/download.model';
import { COLLECTION } from '../collection/collection.model';

// get base analytics
export const baseAnalytics = async (req: Request, res: Response) => {
  const userCount = await USER.countDocuments();
  const packageCount = await PACKAGE.countDocuments();
  const collectionCount = await COLLECTION.countDocuments();
  const downloadCount = await DOWNLOAD.countDocuments();

  res.status(StatusCodes.OK);
  res.json({
    users: userCount,
    packages: packageCount,
    collections: collectionCount,
    downloads: downloadCount,
  });
};

// get all analytics
export const allAnalytics = async (req: Request, res: Response) => {
  const userCount = await USER.countDocuments();
  const collectionCount = await COLLECTION.countDocuments();
  const categories = await CATEGORY.find({});
  const packages = await PACKAGE.find({}).populate('category');
  const downloads = await DOWNLOAD.find({}).populate('package');

  // package distribution into categories
  // most downloaded packages
  // downloads in categories

  res.status(StatusCodes.OK);
  res.json({
    userCount,
    packageCount: packages.length,
    downloadCount: downloads.length,
    collectionCount,
    packages,
    downloads,
    categories,
  });
};
