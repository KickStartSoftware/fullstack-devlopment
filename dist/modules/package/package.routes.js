"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const package_controllers_1 = require("./package.controllers");
const packageRouter = (0, express_1.Router)();
packageRouter.route('/').get(package_controllers_1.getAllPackages).post(package_controllers_1.createPackage);
packageRouter.get("/count", package_controllers_1.countPackages);
packageRouter
    .route('/:id')
    .get(package_controllers_1.getSinglePackage)
    .patch(package_controllers_1.updatePackage)
    .delete(package_controllers_1.deletePackage);
exports.default = packageRouter;
