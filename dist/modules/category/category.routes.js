"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controllers_1 = require("./category.controllers");
const categoryRouter = (0, express_1.Router)();
categoryRouter.route('/').get(category_controllers_1.getAllCategories).post(category_controllers_1.createCategory);
categoryRouter.get('/count', category_controllers_1.countCategories);
categoryRouter
    .route('/:id')
    .get(category_controllers_1.getSingleCategory)
    .patch(category_controllers_1.updateCategory)
    .delete(category_controllers_1.deleteCategory);
exports.default = categoryRouter;
