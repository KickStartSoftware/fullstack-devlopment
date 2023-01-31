"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getSingleCategory = exports.getAllCategories = exports.createCategory = exports.countCategories = void 0;
const http_status_codes_1 = require("http-status-codes");
const throw_exception_1 = require("../../exceptions/throw-exception");
const category_dto_1 = require("./category.dto");
const category_model_1 = require("./category.model");
// count categories
const countCategories = async (req, res) => {
    const count = await category_model_1.CATEGORY.count({});
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        count,
    });
};
exports.countCategories = countCategories;
// create category
const createCategory = async (req, res) => {
    const categoryDto = new category_dto_1.CategoryDto(req.body);
    const category = await category_model_1.CATEGORY.create(categoryDto);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(category);
};
exports.createCategory = createCategory;
// get all categories
const getAllCategories = async (req, res) => {
    const categories = await category_model_1.CATEGORY.find({}).sort('-createdAt');
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        total: categories.length,
        data: categories,
    });
};
exports.getAllCategories = getAllCategories;
// get Single category
const getSingleCategory = async (req, res) => {
    const { id } = req.params;
    const category = await category_model_1.CATEGORY.findById(id);
    if (!category) {
        throw_exception_1.ThrowException.notFound(`No category with id:${id}`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(category);
};
exports.getSingleCategory = getSingleCategory;
// update category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const categoryDto = new category_dto_1.CategoryDto(req.body);
    if (!categoryDto.name) {
        throw_exception_1.ThrowException.badRequest('Provide a name for this category');
    }
    const category = await category_model_1.CATEGORY.findById(id);
    if (!category) {
        throw_exception_1.ThrowException.notFound(`No category with id:${id}`);
    }
    if (category.name === categoryDto.name) {
        throw_exception_1.ThrowException.badRequest('Provide a new name');
    }
    category.name = categoryDto.name;
    await (category === null || category === void 0 ? void 0 : category.save());
    return res.status(http_status_codes_1.StatusCodes.OK).json(category);
};
exports.updateCategory = updateCategory;
// delete category
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const category = await category_model_1.CATEGORY.findById(id);
    if (!category) {
        throw_exception_1.ThrowException.notFound(`No category with id:${id}`);
    }
    await category.remove();
    return res.status(http_status_codes_1.StatusCodes.NO_CONTENT).send();
};
exports.deleteCategory = deleteCategory;
