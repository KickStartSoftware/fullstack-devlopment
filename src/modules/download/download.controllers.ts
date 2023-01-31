import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ThrowException } from '../../exceptions/throw-exception';
import { DOWNLOAD } from './download.model';
import { DownloadDto, DownloadQueryDto } from './download.dto';
import { Utils } from '../../util';
import { PACKAGE } from '../package/package.model';

// count downloads
export const countDownloads = async (req: Request, res: Response) => {
  const queryDto = new DownloadQueryDto(req.query);
  const query: any = {};

  if (queryDto.userId) {
    query.user = queryDto.userId;
  }

  const count = await DOWNLOAD.count(query);
  return res.status(StatusCodes.OK).json({
    count,
  });
};

// count my downloads
export const countMyDownloads = async (req: Request, res: Response) => {
  const user = req.user;
  const query: any = {
    user: user.id,
  };

  const count = await DOWNLOAD.count(query);
  return res.status(StatusCodes.OK).json({
    count,
  });
};

// create download
export const createDownload = async (req: Request, res: Response) => {
  const downloadDto = new DownloadDto(req.body);
  const user = req.user;

  if (downloadDto.packageIds.length === 0) {
    ThrowException.badRequest(
      'Please provide at least one package id in an array'
    );
  }

  for (const packageId of downloadDto.packageIds) {
    const software = await PACKAGE.findById(packageId);
    if (!software) {
      ThrowException.notFound(`Package with id:${packageId} cannot be found`);
    }
  }

  const downloads = await DOWNLOAD.create(
    downloadDto.packageIds.map(packageId => ({
      user: user.id,
      package: packageId,
    }))
  );

  return res.status(StatusCodes.CREATED).json(downloads);
};

// create public download
export const createPublicDownload = async (req: Request, res: Response) => {
  const downloadDto = new DownloadDto(req.body);
  if (downloadDto.packageIds.length === 0) {
    ThrowException.badRequest(
      'Please provide at least one package id in an array'
    );
  }

  for (const packageId of downloadDto.packageIds) {
    const software = await PACKAGE.findById(packageId);
    if (!software) {
      ThrowException.notFound(`Package with id:${packageId} cannot be found`);
    }
  }

  const downloads = await DOWNLOAD.create(
    downloadDto.packageIds.map(packageId => ({
      user: null,
      package: packageId,
    }))
  );

  return res.status(StatusCodes.CREATED).json(downloads);
};

// get downloads
export const getMyDownloads = async (req: Request, res: Response) => {
  const user = req.user;
  const query: any = {
    user: user.id,
  };

  const count = await DOWNLOAD.count(query);
  const results = DOWNLOAD.find(query);

  const { page, limit } = req.query;
  const pagination = Utils.paginationQuery(count, limit, page);
  const downloads = await results
    .skip(pagination.skip)
    .limit(pagination.limit)
    .sort('-createdAt');

  return res.status(StatusCodes.OK).json({
    pagination: Utils.generatePaginationInfo(pagination),
    data: downloads,
  });
};

//get Public downloads
export const getPublicdownloads = async (req: Request, res: Response) => {
  const query = { user: null };
  const count = await DOWNLOAD.count(query);
  const results = DOWNLOAD.find(query);

  const { page, limit } = req.query;
  const pagination = Utils.paginationQuery(count, limit, page);
  const downloads = await results
    .skip(pagination.skip)
    .limit(pagination.limit)
    .sort('-createdAt');

  return res.status(StatusCodes.OK).json({
    pagination: Utils.generatePaginationInfo(pagination),
    data: downloads,
  });
};

// get single download
export const getSingleDownload = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const download = await DOWNLOAD.findById(id).populate('user package');
  if (!download) {
    ThrowException.notFound(`no download with this  id:${id}  found`);
  }

  Utils.checkOwner(user, download!.user._id);
  return res.status(StatusCodes.OK).json(download);
};

// get single public downloads
export const getSinglePublicDownload = async (req: Request, res: Response) => {
  const { id } = req.params;
  const download = await DOWNLOAD.findById(id).populate('user package');
  if (!download) {
    ThrowException.notFound(`no download with this id:${id} found`);
  }

  if (download?.user?._id) {
    ThrowException.notFound(`no download with this id:${id} found`);
  }
  return res.status(StatusCodes.OK).json(download);
};

// update download
export const updateDownload = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { packageId } = req.body;

  const download = await DOWNLOAD.findById(id);
  if (!download) {
    ThrowException.notFound(`no download with this id:${id} found`);
  }

  if (packageId) {
    download!.package = packageId;
  }

  await download?.save();
  return res.status(StatusCodes.OK).json(download);
};

// delete download
export const deleteDownload = async (req: Request, res: Response) => {
  const { id } = req.params;

  const download = await DOWNLOAD.findById(id);
  if (!download) {
    ThrowException.notFound(`no download with this id:${id} found`);
  }

  await download?.remove();
  return res.status(StatusCodes.NO_CONTENT).send();
};
