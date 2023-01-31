"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("./modules/user/user.model");
const throw_exception_1 = require("./exceptions/throw-exception");
class Utils {
    static isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    static generateCryptoToken() {
        return crypto_1.default.randomBytes(70).toString('hex');
    }
    static generatePayload(user) {
        return {
            id: user._id,
            role: user.role,
            email: user.email,
            username: user.username,
            isVerified: user.isVerified,
        };
    }
    static createHash(token) {
        return crypto_1.default.createHash('md5').update(token).digest('hex');
    }
    static createExpiryDate(minutes = 10) {
        return new Date(Date.now() + 1000 * 60 * minutes);
    }
    static createHashToken() {
        const token = this.generateCryptoToken();
        const hash = this.createHash(token);
        return {
            token,
            hash,
        };
    }
    static verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, config_1.config.token_secret);
    }
    static checkOwner(requestUser, resourceId, message = 'You are not authorized to do this') {
        if (requestUser.role === user_model_1.UserRole.ADMIN)
            return;
        if (requestUser.id === resourceId.toString())
            return;
        throw_exception_1.ThrowException.unAuthorized(message);
    }
    static paginationQuery(count, limit = '20', page = '1') {
        const skip = (Number(page) - 1) * Number(limit);
        return {
            page: Number(page),
            limit: Number(limit),
            skip,
            total: count,
            lastPage: Math.ceil(count / Number(limit)),
        };
    }
    static generatePaginationInfo(pagination) {
        return {
            page: pagination.page,
            limit: pagination.limit,
            total: pagination.total,
            lastPage: pagination.lastPage,
        };
    }
}
exports.Utils = Utils;
_a = Utils;
Utils.generateToken = (user) => {
    const payload = _a.generatePayload(user);
    const options = {
        expiresIn: config_1.config.token_lifetime,
    };
    return jsonwebtoken_1.default.sign(payload, config_1.config.token_secret, options);
};
