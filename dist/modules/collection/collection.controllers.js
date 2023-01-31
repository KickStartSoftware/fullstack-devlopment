"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollection = exports.updateCollection = exports.getSingleCollection = exports.getMyCollections = exports.getAllCollections = exports.createCollection = exports.countMyCollections = exports.countCollections = void 0;
const http_status_codes_1 = require("http-status-codes");
const throw_exception_1 = require("../../exceptions/throw-exception");
const collection_model_1 = require("./collection.model");
const package_model_1 = require("../package/package.model");
const collection_dto_1 = require("./collection.dto");
const util_1 = require("../../util");
// count collections
const countCollections = async (req, res) => {
    const collectionQuery = new collection_dto_1.CollectionDto(req.query);
    const count = await collection_model_1.COLLECTION.count(collectionQuery.constructQuery());
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        count,
    });
};
exports.countCollections = countCollections;
// count my collections
const countMyCollections = async (req, res) => {
    const user = req.user;
    const collectionQuery = new collection_dto_1.CollectionDto({
        ...req.query,
        userId: user.id,
    });
    const count = await collection_model_1.COLLECTION.count(collectionQuery.constructQuery());
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        count,
    });
};
exports.countMyCollections = countMyCollections;
// create collection
const createCollection = async (req, res) => {
    const user = req.user;
    const collectionDto = new collection_dto_1.CollectionDto({
        ...req.body,
        userId: user.id,
    });
    if (!collectionDto.name) {
        throw_exception_1.ThrowException.badRequest('Please provide a package name');
    }
    if (collectionDto.packageIds.length === 0) {
        throw_exception_1.ThrowException.badRequest('Please provide at least one package id in an array');
    }
    const existingCollection = await collection_model_1.COLLECTION.findOne({
        user: collectionDto.userId,
        name: collectionDto.name,
    });
    if (existingCollection) {
        throw_exception_1.ThrowException.badRequest('Collection already exist');
    }
    let packages = [];
    for (const packageId of collectionDto.packageIds) {
        const software = await package_model_1.PACKAGE.findById(packageId);
        if (!software) {
            throw_exception_1.ThrowException.notFound(`Package with id:${packageId} cannot be found`);
        }
        packages = [...packages, software];
    }
    const collection = await collection_model_1.COLLECTION.create({
        name: collectionDto.name,
        user: collectionDto.userId,
        packages,
    });
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(collection);
};
exports.createCollection = createCollection;
// get all collections
const getAllCollections = async (req, res) => {
    const collectionQuery = new collection_dto_1.CollectionDto(req.query);
    const query = collectionQuery.constructQuery();
    const count = await collection_model_1.COLLECTION.count(query);
    const results = collection_model_1.COLLECTION.find(query);
    const { page, limit } = req.query;
    const pagination = util_1.Utils.paginationQuery(count, limit, page);
    const collections = await results
        .skip(pagination.skip)
        .limit(pagination.limit)
        .sort('-createdAt');
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        pagination: util_1.Utils.generatePaginationInfo(pagination),
        data: collections,
    });
};
exports.getAllCollections = getAllCollections;
// get my collections
const getMyCollections = async (req, res) => {
    const user = req.user;
    const collectionQuery = new collection_dto_1.CollectionDto({
        ...req.query,
        userId: user.id,
    });
    const query = collectionQuery.constructQuery();
    const count = await collection_model_1.COLLECTION.count(query);
    const results = collection_model_1.COLLECTION.find(query);
    const { page, limit } = req.query;
    const pagination = util_1.Utils.paginationQuery(count, limit, page);
    const collections = await results
        .skip(pagination.skip)
        .limit(pagination.limit)
        .sort('-createdAt');
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        pagination: util_1.Utils.generatePaginationInfo(pagination),
        data: collections,
    });
};
exports.getMyCollections = getMyCollections;
// get single collection
const getSingleCollection = async (req, res) => {
    const { id } = req.params;
    const collection = await collection_model_1.COLLECTION.findById(id).populate('user');
    if (!collection) {
        throw_exception_1.ThrowException.notFound(`Collection with id:${id} cannot be found`);
    }
    util_1.Utils.checkOwner(req.user, collection.user._id);
    return res.status(http_status_codes_1.StatusCodes.OK).json(collection);
};
exports.getSingleCollection = getSingleCollection;
// update collection
const updateCollection = async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const collectionDto = new collection_dto_1.CollectionDto({
        ...req.body,
        userId: user.id,
    });
    const collection = await collection_model_1.COLLECTION.findById(id).populate('user');
    if (!collection) {
        throw_exception_1.ThrowException.notFound(`Collection with id:${id} cannot be found`);
    }
    if (collectionDto.name) {
        const existingCollection = await collection_model_1.COLLECTION.findOne({
            user: collectionDto.userId,
            name: collectionDto.name,
        });
        if (existingCollection) {
            throw_exception_1.ThrowException.badRequest('Collection already exist');
        }
        collection.name = collectionDto.name;
    }
    if (collectionDto.packageIds.length > 0) {
        let packages = [];
        for (const packageId of collectionDto.packageIds) {
            const software = await package_model_1.PACKAGE.findById(packageId);
            if (!software) {
                throw_exception_1.ThrowException.notFound(`Package with id:${packageId} cannot be found`);
            }
            packages = [...packages, software];
        }
        collection.packages = packages;
    }
    await collection.save();
    return res.status(http_status_codes_1.StatusCodes.OK).json(collection);
};
exports.updateCollection = updateCollection;
// delete collection
const deleteCollection = async (req, res) => {
    const { id } = req.params;
    const collection = await collection_model_1.COLLECTION.findById(id).populate('user');
    if (!collection) {
        throw_exception_1.ThrowException.notFound(`Collection with id:${id} cannot be found`);
    }
    util_1.Utils.checkOwner(req.user, collection.user._id);
    await (collection === null || collection === void 0 ? void 0 : collection.remove());
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
};
exports.deleteCollection = deleteCollection;
