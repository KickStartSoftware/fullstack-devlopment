"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const auth_controllers_1 = require("./auth.controllers");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', auth_controllers_1.registerUser);
authRouter.post('/login', auth_controllers_1.loginUser);
authRouter.post('/forgot-password', auth_controllers_1.forgotPassword);
authRouter.post('/reset-password', auth_controllers_1.resetPassword);
authRouter.get('/me', auth_middleware_1.authMiddleware, auth_controllers_1.showMe);
exports.default = authRouter;
