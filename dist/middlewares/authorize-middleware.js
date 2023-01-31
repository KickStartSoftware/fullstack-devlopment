"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeMiddleware = void 0;
const throw_exception_1 = require("../exceptions/throw-exception");
const authorizeMiddleware = (...roles) => {
    return (req, _, next) => {
        const user = req.user;
        if (roles.includes(user.role)) {
            next();
        }
        else {
            throw_exception_1.ThrowException.unAuthorized('You are not authorized to perform this action');
        }
    };
};
exports.authorizeMiddleware = authorizeMiddleware;
