"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allAnalytics = exports.baseAnalytics = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = require("../user/user.model");
const category_model_1 = require("../category/category.model");
const package_model_1 = require("../package/package.model");
const download_model_1 = require("../download/download.model");
const collection_model_1 = require("../collection/collection.model");
// get base analytics
const baseAnalytics = async (req, res) => {
    const userCount = await user_model_1.USER.countDocuments();
    const packageCount = await package_model_1.PACKAGE.countDocuments();
    const collectionCount = await collection_model_1.COLLECTION.countDocuments();
    const downloadCount = await download_model_1.DOWNLOAD.countDocuments();
    res.status(http_status_codes_1.StatusCodes.OK);
    res.json({
        users: userCount,
        packages: packageCount,
        collections: collectionCount,
        downloads: downloadCount,
    });
};
exports.baseAnalytics = baseAnalytics;
// get all analytics
const allAnalytics = async (req, res) => {
    const userCount = await user_model_1.USER.countDocuments();
    const collectionCount = await collection_model_1.COLLECTION.countDocuments();
    const categories = await category_model_1.CATEGORY.find({});
    const packages = await package_model_1.PACKAGE.find({}).populate('category');
    const downloads = await download_model_1.DOWNLOAD.find({}).populate('package');
    // package distribution into categories
    // most downloaded packages
    // downloads in categories
    res.status(http_status_codes_1.StatusCodes.OK);
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
exports.allAnalytics = allAnalytics;
