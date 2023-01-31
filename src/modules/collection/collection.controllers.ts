import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ThrowException } from '../../exceptions/throw-exception';
import { COLLECTION } from './collection.model';
import { IPackageSchema, PACKAGE } from '../package/package.model';
import { CollectionDto } from './collection.dto';
import { Utils } from '../../util';
import { UserPayload } from '../user/user.model';

// count collections
export const countCollections = async (req: Request, res: Response) => {
  const collectionQuery = new CollectionDto(req.query);
  const count = await COLLECTION.count(collectionQuery.constructQuery());
  return res.status(StatusCodes.OK).json({
    count,
  });
};

// count my collections
export const countMyCollections = async (req: Request, res: Response) => {
  const user = req.user;
  const collectionQuery = new CollectionDto({
    ...req.query,
    userId: user.id,
  });
  const count = await COLLECTION.count(collectionQuery.constructQuery());
  return res.status(StatusCodes.OK).json({
    count,
  });
};

// create collection
export const createCollection = async (req: Request, res: Response) => {
  const user = req.user;
  const collectionDto = new CollectionDto({
    ...req.body,
    userId: user.id,
  });

  if (!collectionDto.name) {
    ThrowException.badRequest('Please provide a package name');
  }

  if (collectionDto.packageIds.length === 0) {
    ThrowException.badRequest(
      'Please provide at least one package id in an array'
    );
  }

  const existingCollection = await COLLECTION.findOne({
    user: collectionDto.userId,
    name: collectionDto.name,
  });

  if (existingCollection) {
    ThrowException.badRequest('Collection already exist');
  }

  let packages: IPackageSchema[] = [];
  for (const packageId of collectionDto.packageIds) {
    const software = await PACKAGE.findById(packageId);
    if (!software) {
      ThrowException.notFound(`Package with id:${packageId} cannot be found`);
    }
    packages = [...packages, software!];
  }

  const collection = await COLLECTION.create({
    name: collectionDto.name,
    user: collectionDto.userId,
    packages,
  });
  return res.status(StatusCodes.CREATED).json(collection);
};

// get all collections
export const getAllCollections = async (req: Request, res: Response) => {
  const collectionQuery = new CollectionDto(req.query);
  const query = collectionQuery.constructQuery();

  const count = await COLLECTION.count(query);
  const results = COLLECTION.find(query);

  const { page, limit } = req.query;
  const pagination = Utils.paginationQuery(count, limit, page);
  const collections = await results
    .skip(pagination.skip)
    .limit(pagination.limit)
    .sort('-createdAt');

  return res.status(StatusCodes.OK).json({
    pagination: Utils.generatePaginationInfo(pagination),
    data: collections,
  });
};

// get my collections
export const getMyCollections = async (req: Request, res: Response) => {
  const user = req.user;
  const collectionQuery = new CollectionDto({
    ...req.query,
    userId: user.id,
  });
  const query = collectionQuery.constructQuery();

  const count = await COLLECTION.count(query);
  const results = COLLECTION.find(query);

  const { page, limit } = req.query;
  const pagination = Utils.paginationQuery(count, limit, page);
  const collections = await results
    .skip(pagination.skip)
    .limit(pagination.limit)
    .sort('-createdAt');

  return res.status(StatusCodes.OK).json({
    pagination: Utils.generatePaginationInfo(pagination),
    data: collections,
  });
};

// get single collection
export const getSingleCollection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const collection = await COLLECTION.findById(id).populate('user');
  if (!collection) {
    ThrowException.notFound(`Collection with id:${id} cannot be found`);
  }

  Utils.checkOwner(req.user, collection!.user._id);
  return res.status(StatusCodes.OK).json(collection);
};

// update collection
export const updateCollection = async (req: Request, res: Response) => {
  const user = req.user;
  const { id } = req.params;

  const collectionDto = new CollectionDto({
    ...req.body,
    userId: user.id,
  });
  const collection = await COLLECTION.findById(id).populate('user');
  if (!collection) {
    ThrowException.notFound(`Collection with id:${id} cannot be found`);
  }

  if (collectionDto.name) {
    const existingCollection = await COLLECTION.findOne({
      user: collectionDto.userId,
      name: collectionDto.name,
    });

    if (existingCollection) {
      ThrowException.badRequest('Collection already exist');
    }
    collection!.name = collectionDto.name;
  }

  if (collectionDto.packageIds.length > 0) {
    let packages: IPackageSchema[] = [];
    for (const packageId of collectionDto.packageIds) {
      const software = await PACKAGE.findById(packageId);
      if (!software) {
        ThrowException.notFound(`Package with id:${packageId} cannot be found`);
      }
      packages = [...packages, software!];
    }
    collection!.packages = packages as any;
  }

  await collection!.save();
  return res.status(StatusCodes.OK).json(collection);
};

// delete collection
export const deleteCollection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const collection = await COLLECTION.findById(id).populate('user');
  if (!collection) {
    ThrowException.notFound(`Collection with id:${id} cannot be found`);
  }

  Utils.checkOwner(req.user , collection!.user._id);
  await collection?.remove();
  res.status(StatusCodes.NO_CONTENT).send();
};
