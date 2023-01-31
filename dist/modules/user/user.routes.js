"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const authorize_middleware_1 = require("../../middlewares/authorize-middleware");
const user_controllers_1 = require("./user.controllers");
const user_model_1 = require("./user.model");
const userRouter = (0, express_1.Router)();
userRouter
    .route('/')
    .get(auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorizeMiddleware)(user_model_1.UserRole.ADMIN), user_controllers_1.getAllUsers)
    .post(auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorizeMiddleware)(user_model_1.UserRole.ADMIN), user_controllers_1.createUser);
userRouter.get('/count', user_controllers_1.countUsers);
userRouter
    .route('/:id')
    .get(auth_middleware_1.authMiddleware, user_controllers_1.getSingleUser)
    .patch(auth_middleware_1.authMiddleware, user_controllers_1.updateUser)
    .delete(auth_middleware_1.authMiddleware, (0, authorize_middleware_1.authorizeMiddleware)(user_model_1.UserRole.ADMIN), user_controllers_1.deleteUser);
exports.default = userRouter;
