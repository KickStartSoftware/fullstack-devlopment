"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const util_1 = require("../util");
const throw_exception_1 = require("../exceptions/throw-exception");
// Verify token
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
        throw_exception_1.ThrowException.unAuthenticated('Token is required');
    }
    try {
        const decoded = util_1.Utils.verifyToken(token.split(' ')[1]);
        req.user = {
            email: decoded.email,
            role: decoded.role,
            id: decoded.id,
            isVerified: decoded.isVerified,
        };
        next();
    }
    catch (err) {
        throw_exception_1.ThrowException.unAuthenticated('Invalid token');
    }
};
exports.authMiddleware = authMiddleware;
