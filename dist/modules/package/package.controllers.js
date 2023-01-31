"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePackage = exports.updatePackage = exports.getSinglePackage = exports.getAllPackages = exports.createPackage = exports.countPackages = void 0;
const http_status_codes_1 = require("http-status-codes");
const throw_exception_1 = require("../../exceptions/throw-exception");
const package_dto_1 = require("./package.dto");
const package_model_1 = require("./package.model");
const util_1 = require("../../util");
const category_model_1 = require("../category/category.model");
// count packages
const countPackages = async (req, res) => {
    const count = await package_model_1.PACKAGE.count({});
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        count,
    });
};
exports.countPackages = countPackages;
// create package
const createPackage = async (req, res) => {
    const packageDto = new package_dto_1.PackageDto(req.body);
    const existingPackage = await package_model_1.PACKAGE.findOne({ name: packageDto.name });
    if (existingPackage) {
        throw_exception_1.ThrowException.badRequest('Package already exist');
    }
    const category = await category_model_1.CATEGORY.findById(packageDto.category);
    if (!category) {
        throw_exception_1.ThrowException.badRequest(`No category with id:${packageDto.category}`);
    }
    const software = await package_model_1.PACKAGE.create(packageDto);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(software);
};
exports.createPackage = createPackage;
// get all packages
const getAllPackages = async (req, res) => {
    const softwares = await package_model_1.PACKAGE.find({})
        .sort('-createdAt')
        .populate('category', '_id name');
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        total: softwares.length,
        data: softwares,
    });
};
exports.getAllPackages = getAllPackages;
// get single package
const getSinglePackage = async (req, res) => {
    const { id } = req.params;
    const software = await package_model_1.PACKAGE.findById(id).populate('category');
    if (!software) {
        throw_exception_1.ThrowException.badRequest(`Software with this id :${id} cannot be found`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(software);
};
exports.getSinglePackage = getSinglePackage;
// update software package
const updatePackage = async (req, res) => {
    const { id } = req.params;
    if (util_1.Utils.isEmpty(req.body)) {
        throw_exception_1.ThrowException.badRequest('provide new data for this software');
    }
    const packageDto = new package_dto_1.PackageDto(req.body);
    const { name, category, numberOfDownloads, win32url, win64url } = packageDto;
    const software = await package_model_1.PACKAGE.findById(id);
    if (!software) {
        throw_exception_1.ThrowException.badRequest(`Software with this id :${id} cannot be found`);
    }
    if (name) {
        const existingPackage = await package_model_1.PACKAGE.findOne({ name: packageDto.name });
        if (existingPackage) {
            throw_exception_1.ThrowException.badRequest('Package already exist');
        }
        software.name = name;
    }
    if (category)
        software.category = category;
    if (numberOfDownloads)
        software.numberOfDownloads = numberOfDownloads;
    if (win32url)
        software.win32url = win32url;
    if (win64url)
        software.win64url = win64url;
    await (software === null || software === void 0 ? void 0 : software.save());
    return res.status(http_status_codes_1.StatusCodes.OK).json(software);
};
exports.updatePackage = updatePackage;
// delete software package
const deletePackage = async (req, res) => {
    const { id } = req.params;
    const software = await package_model_1.PACKAGE.findById(id);
    if (!software) {
        throw_exception_1.ThrowException.badRequest(`Software with this id :${id} cannot be found`);
    }
    await (software === null || software === void 0 ? void 0 : software.remove());
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
};
exports.deletePackage = deletePackage;
