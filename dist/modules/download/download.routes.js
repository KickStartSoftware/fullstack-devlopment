"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const authorize_middleware_1 = require("../../middlewares/authorize-middleware");
const user_model_1 = require("../user/user.model");
const download_controllers_1 = require("./download.controllers");
const downloadRouter = (0, express_1.Router)();
downloadRouter
    .route('/')
    .post(auth_middleware_1.authMiddleware, download_controllers_1.createDownload)
    .get(auth_middleware_1.authMiddleware, download_controllers_1.getMyDownloads);
downloadRouter
    .route('/public')
    .get(download_controllers_1.getPublicdownloads)
    .post(download_controllers_1.createPublicDownload);
downloadRouter.get('/count', download_controllers_1.countDownloads);
downloadRouter.get('/count/me', auth_middleware_1.authMiddleware, download_controllers_1.countMyDownloads);
downloadRouter.get('/public/:id', download_controllers_1.getSinglePublicDownload);
downloadRouter
    .route('/:id')
    .get(auth_middleware_1.authMiddleware, download_controllers_1.getSingleDownload)
    .patch(auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorizeMiddleware)(user_model_1.UserRole.ADMIN), download_controllers_1.updateDownload)
    .delete(auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorizeMiddleware)(user_model_1.UserRole.ADMIN), download_controllers_1.deleteDownload);
exports.default = downloadRouter;
