"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const authorize_middleware_1 = require("../../middlewares/authorize-middleware");
const user_model_1 = require("../user/user.model");
const collection_controllers_1 = require("./collection.controllers");
const collectionRouter = (0, express_1.Router)();
collectionRouter
    .route('/')
    .get(auth_middleware_1.authMiddleware, collection_controllers_1.getMyCollections)
    .post(auth_middleware_1.authMiddleware, collection_controllers_1.createCollection);
collectionRouter.get('/all', auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorizeMiddleware)(user_model_1.UserRole.ADMIN), collection_controllers_1.getAllCollections);
collectionRouter.get('/count', collection_controllers_1.countCollections);
collectionRouter.get('/count/me', auth_middleware_1.authMiddleware, collection_controllers_1.countMyCollections);
collectionRouter
    .route('/:id')
    .get(auth_middleware_1.authMiddleware, collection_controllers_1.getSingleCollection)
    .patch(auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorizeMiddleware)(user_model_1.UserRole.USER), collection_controllers_1.updateCollection)
    .delete(auth_middleware_1.authMiddleware, collection_controllers_1.deleteCollection);
exports.default = collectionRouter;
