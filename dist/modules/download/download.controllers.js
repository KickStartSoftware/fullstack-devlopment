"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDownload = exports.updateDownload = exports.getSinglePublicDownload = exports.getSingleDownload = exports.getPublicdownloads = exports.getMyDownloads = exports.createPublicDownload = exports.createDownload = exports.countMyDownloads = exports.countDownloads = void 0;
const http_status_codes_1 = require("http-status-codes");
const throw_exception_1 = require("../../exceptions/throw-exception");
const download_model_1 = require("./download.model");
const download_dto_1 = require("./download.dto");
const util_1 = require("../../util");
const package_model_1 = require("../package/package.model");
// count downloads
const countDownloads = async (req, res) => {
    const queryDto = new download_dto_1.DownloadQueryDto(req.query);
    const query = {};
    if (queryDto.userId) {
        query.user = queryDto.userId;
    }
    const count = await download_model_1.DOWNLOAD.count(query);
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        count,
    });
};
exports.countDownloads = countDownloads;
// count my downloads
const countMyDownloads = async (req, res) => {
    const user = req.user;
    const query = {
        user: user.id,
    };
    const count = await download_model_1.DOWNLOAD.count(query);
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        count,
    });
};
exports.countMyDownloads = countMyDownloads;
// create download
const createDownload = async (req, res) => {
    const downloadDto = new download_dto_1.DownloadDto(req.body);
    const user = req.user;
    if (downloadDto.packageIds.length === 0) {
        throw_exception_1.ThrowException.badRequest('Please provide at least one package id in an array');
    }
    for (const packageId of downloadDto.packageIds) {
        const software = await package_model_1.PACKAGE.findById(packageId);
        if (!software) {
            throw_exception_1.ThrowException.notFound(`Package with id:${packageId} cannot be found`);
        }
    }
    const downloads = await download_model_1.DOWNLOAD.create(downloadDto.packageIds.map(packageId => ({
        user: user.id,
        package: packageId,
    })));
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(downloads);
};
exports.createDownload = createDownload;
// create public download
const createPublicDownload = async (req, res) => {
    const downloadDto = new download_dto_1.DownloadDto(req.body);
    if (downloadDto.packageIds.length === 0) {
        throw_exception_1.ThrowException.badRequest('Please provide at least one package id in an array');
    }
    for (const packageId of downloadDto.packageIds) {
        const software = await package_model_1.PACKAGE.findById(packageId);
        if (!software) {
            throw_exception_1.ThrowException.notFound(`Package with id:${packageId} cannot be found`);
        }
    }
    const downloads = await download_model_1.DOWNLOAD.create(downloadDto.packageIds.map(packageId => ({
        user: null,
        package: packageId,
    })));
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(downloads);
};
exports.createPublicDownload = createPublicDownload;
// get downloads
const getMyDownloads = async (req, res) => {
    const user = req.user;
    const query = {
        user: user.id,
    };
    const count = await download_model_1.DOWNLOAD.count(query);
    const results = download_model_1.DOWNLOAD.find(query);
    const { page, limit } = req.query;
    const pagination = util_1.Utils.paginationQuery(count, limit, page);
    const downloads = await results
        .skip(pagination.skip)
        .limit(pagination.limit)
        .sort('-createdAt');
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        pagination: util_1.Utils.generatePaginationInfo(pagination),
        data: downloads,
    });
};
exports.getMyDownloads = getMyDownloads;
//get Public downloads
const getPublicdownloads = async (req, res) => {
    const query = { user: null };
    const count = await download_model_1.DOWNLOAD.count(query);
    const results = download_model_1.DOWNLOAD.find(query);
    const { page, limit } = req.query;
    const pagination = util_1.Utils.paginationQuery(count, limit, page);
    const downloads = await results
        .skip(pagination.skip)
        .limit(pagination.limit)
        .sort('-createdAt');
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        pagination: util_1.Utils.generatePaginationInfo(pagination),
        data: downloads,
    });
};
exports.getPublicdownloads = getPublicdownloads;
// get single download
const getSingleDownload = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const download = await download_model_1.DOWNLOAD.findById(id).populate('user package');
    if (!download) {
        throw_exception_1.ThrowException.notFound(`no download with this  id:${id}  found`);
    }
    util_1.Utils.checkOwner(user, download.user._id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(download);
};
exports.getSingleDownload = getSingleDownload;
// get single public downloads
const getSinglePublicDownload = async (req, res) => {
    var _a;
    const { id } = req.params;
    const download = await download_model_1.DOWNLOAD.findById(id).populate('user package');
    if (!download) {
        throw_exception_1.ThrowException.notFound(`no download with this id:${id} found`);
    }
    if ((_a = download === null || download === void 0 ? void 0 : download.user) === null || _a === void 0 ? void 0 : _a._id) {
        throw_exception_1.ThrowException.notFound(`no download with this id:${id} found`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(download);
};
exports.getSinglePublicDownload = getSinglePublicDownload;
// update download
const updateDownload = async (req, res) => {
    const { id } = req.params;
    const { packageId } = req.body;
    const download = await download_model_1.DOWNLOAD.findById(id);
    if (!download) {
        throw_exception_1.ThrowException.notFound(`no download with this id:${id} found`);
    }
    if (packageId) {
        download.package = packageId;
    }
    await (download === null || download === void 0 ? void 0 : download.save());
    return res.status(http_status_codes_1.StatusCodes.OK).json(download);
};
exports.updateDownload = updateDownload;
// delete download
const deleteDownload = async (req, res) => {
    const { id } = req.params;
    const download = await download_model_1.DOWNLOAD.findById(id);
    if (!download) {
        throw_exception_1.ThrowException.notFound(`no download with this id:${id} found`);
    }
    await (download === null || download === void 0 ? void 0 : download.remove());
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
};
exports.deleteDownload = deleteDownload;
